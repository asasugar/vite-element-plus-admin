export default class SheepCard {
  static X = 20;
  static Y = 20;
  static colorType: Record<number, { background: string }> = {
    1: { background: '#FFB7DD' },
    2: { background: '#FFCCCC' },
    3: { background: '#FFC8B4' },
    4: { background: '#FFDDAA' },
    5: { background: '#FFEE99' },
    6: { background: '#FFFFBB' },
    7: { background: '#EEFFBB' },
    8: { background: '#CCFF99' },
    9: { background: '#99FF99' },
    10: { background: '#BBFFEE' },
    11: { background: '#AAFFEE' },
    12: { background: '#99FFFF' },
    13: { background: '#CCEEFF' },
    14: { background: '#CCDDFF' }
  };
  static contentType: Record<number, string> = {
    1: '🥕',
    2: '✂️',
    3: '🥦',
    4: '🥛',
    5: '🌊',
    6: '🧤',
    7: '🧵',
    8: '🌱',
    9: '🔨',
    10: '🌽',
    11: '🌾',
    12: '🐑',
    13: '🪵',
    14: '🔥'
  };
  x: number;
  y: number;
  z: number;
  key: number;
  val: number;
  style: { top: string; left: string; width: string; height: string };
  content!: string;
  cover?: boolean;
  constructor({ x, y, z, key }: { x: number; y: number; z: number; key: number }) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.key = key;
    const offset = z * 0;
    this.val = key;
    this.style = {
      top: y * SheepCard.Y + offset + 'px',
      left: x * SheepCard.X + offset + 'px',
      width: SheepCard.X * 2 - 2 + 'px',
      height: SheepCard.Y * 2 - 8 + 'px'
    };
  }

  setValue(val: number) {
    this.val = val;
    this.content = SheepCard.contentType[val];
    Object.assign(this.style, SheepCard.colorType[val]);
  }
}
