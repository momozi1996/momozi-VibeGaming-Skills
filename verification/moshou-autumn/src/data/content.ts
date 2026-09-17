export const SKILLS = [
  {
    id: "attack",
    key: "1",
    name: "英勇打击",
    icon: "sword",
    description: "选择目标后持续近战攻击。每次攻击获得怒气。",
    cooldown: 1.05,
    cost: 0,
  },
  {
    id: "shield",
    key: "2",
    name: "盾牌猛击",
    icon: "shield",
    description: "造成 24 点伤害，并打断目标 2 秒。",
    cooldown: 6,
    cost: 15,
  },
  {
    id: "whirl",
    key: "3",
    name: "旋风斩",
    icon: "whirl",
    description: "旋转武器，对身边的敌人造成 38 点伤害。",
    cooldown: 8,
    cost: 25,
  },
  {
    id: "potion",
    key: "4",
    name: "治疗药水",
    icon: "potion",
    description: "立即恢复 55 点生命值。消耗一瓶药水。",
    cooldown: 12,
    cost: 0,
  },
] as const;
export const QUEST = {
  title: "林地的骚动",
  subtitle: "北郡修道院 · 原创演示任务",
  description:
    "欢迎来到北郡，年轻的冒险者。最近，东边林地的野狼开始接近道路。请清理三只森林狼，再带回两束宁神花，帮助修道院照料受伤的旅人。",
  reward: "80 经验 · 15 铜币 · 2 瓶治疗药水",
  active:
    "沿着路标向东走。林地里能找到森林狼，道路附近的花圃生长着宁神花。记得留意自己的生命值。",
  complete:
    "干得好。道路又安全了一些，修道院也有了足够的草药。这是你的报酬——愿圣光照亮你接下来的旅途。",
};
export const NPCS = [
  {
    id: "guard",
    name: "修道院守卫",
    role: "北郡卫队",
    x: -4.8,
    z: -7.0,
    yaw: 0.15,
  },
  {
    id: "quartermaster",
    name: "修道院军需官",
    role: "补给与休整",
    x: 10.1,
    z: -3.8,
    yaw: -0.8,
  },
];
export const ENEMIES = [
  { id: "wolf-1", x: 30, z: -20 },
  { id: "wolf-2", x: 40, z: -31 },
  { id: "wolf-3", x: 48, z: -17 },
  { id: "wolf-4", x: 35, z: -39 },
  { id: "wolf-5", x: 53, z: -30 },
];
export const HERBS = [
  { id: "herb-1", x: 29, z: -23 },
  { id: "herb-2", x: 42, z: -25 },
  { id: "herb-3", x: 32, z: -34 },
];
