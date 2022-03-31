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
interface IProjectProps extends TLoading {
  data?: IProject[];
}
interface INavProps extends TLoading {
  data?: INav[];
}
interface INewsProps extends TLoading {
  data?: INews[];
}

export type { IProjectProps, INavProps, INewsProps, TLoading, IProject, INav, INews };
