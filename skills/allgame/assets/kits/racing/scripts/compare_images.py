#!/usr/bin/env python3
"""Compare equal-size PNGs using RGB MAE/RMSE; not SSIM or a perceptual score.
Requires Pillow: python3 -m pip install Pillow (prefer a dedicated virtualenv).
"""
import argparse
import json
import math
from pathlib import Path


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('reference', type=Path)
    p.add_argument('actual', type=Path)
    p.add_argument('--out', required=True, type=Path)
    p.add_argument('--tolerance', type=int, default=8, help='8-bit per-channel difference threshold (0..255)')
    p.add_argument('--max-mae', type=float, help='Optional maximum normalized MAE (0..1); omitted = report only')
    args = p.parse_args()
    if not 0 <= args.tolerance <= 255 or (args.max_mae is not None and not 0 <= args.max_mae <= 1):
        p.error('tolerance must be 0..255; max-mae must be 0..1')
    out = args.out.expanduser().resolve()
    if args.out.is_symlink() or out == args.reference.resolve().parent or out == args.actual.resolve().parent:
        p.error('Choose a separate output directory, not an image input directory or symlink')
    if out.exists() and (not out.is_dir() or any(out.iterdir())):
        p.error('Output must be new or empty; existing evidence is never overwritten')
    out.mkdir(parents=True, exist_ok=True)
    report = dict(ok=False, reference=str(args.reference.resolve()), actual=str(args.actual.resolve()),
                  tolerance=args.tolerance, maxMae=args.max_mae,
                  metric='RGB difference, alpha flattened onto white; normalized range 0..1; not SSIM')
    try:
        from PIL import Image, ImageChops, ImageStat
        def rgb(path):
            with Image.open(path) as img:
                rgba = img.convert('RGBA')
                bg = Image.new('RGBA', rgba.size, 'white')
                return Image.alpha_composite(bg, rgba).convert('RGB')
        ref, actual = rgb(args.reference), rgb(args.actual)
        report.update(referenceSize=list(ref.size), actualSize=list(actual.size))
        if ref.size != actual.size:
            raise ValueError('Dimension mismatch: compare matching viewport/DPR images; no silent resizing')
        diff = ImageChops.difference(ref, actual)
        stat = ImageStat.Stat(diff)
        mae = sum(stat.mean) / (3 * 255)
        rmse = math.sqrt(sum(x*x for x in stat.rms)/3) / 255
        r, g, b = diff.split()
        largest = ImageChops.lighter(ImageChops.lighter(r, g), b)
        histogram = largest.histogram()
        ratio = sum(histogram[args.tolerance+1:]) / (ref.width*ref.height)
        heat = largest.point(lambda value: min(255, value*4))
        Image.merge('RGB', (heat, Image.new('L', ref.size), Image.new('L', ref.size))).save(out/'heatmap.png')
        Image.blend(ref, actual, 0.5).save(out/'overlay.png')
        diff.save(out/'absolute-difference.png')
        passed = None if args.max_mae is None else mae <= args.max_mae
        report.update(ok=True, mae=mae, rmse=rmse, outsideToleranceRatio=ratio,
                      thresholdPassed=passed, verdict='report-only' if passed is None else ('pass' if passed else 'fail'))
    except (ImportError, OSError, ValueError) as error:
        report['error'] = str(error)
    (out/'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report['ok'] and report.get('thresholdPassed') is not False else 1


if __name__ == '__main__':
    raise SystemExit(main())
