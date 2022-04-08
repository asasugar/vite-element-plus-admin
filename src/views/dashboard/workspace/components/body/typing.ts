// types
interface TLoading {
  loading?: boolean;
}

interface IProject {
  sortId: string;
  sortName: string;
  icon: string;
  name: string;
  desc: string;
  editTime: string;
}

interface INav {
  name: string;
  title: string;
}

interface INews {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

export type { TLoading, IProject, INav, INews };
