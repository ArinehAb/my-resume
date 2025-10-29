export type Skill = {
  id: number;
  category: string;
  name: string;
  level: number;
  sort_order?: number | null;
};

export type HoverProject = {
  id: number;
  title: string;
  description: string | null;
  technologies: string[] | null;
  media_url: string | null;
  website_url: string | null;
};
