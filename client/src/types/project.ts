export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  featured?: boolean;
}
