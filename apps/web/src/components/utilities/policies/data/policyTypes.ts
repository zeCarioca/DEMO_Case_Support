export interface PolicySection {
  title: string;
  subtitle?: string;
  content: string[];
  warning?: string;
  substeps?: Array<{
    code?: string;
    title: string;
    description: string;
    subitems?: string[];
  }>;
}

export interface PolicySnippet {
  title: string;
  badge?: string;
  text: string;
  warning?: string;
  note?: string;
}

export interface PolicyDocument {
  id: string;
  code?: string;
  title: string;
  originalTitle: string;
  area: string;
  creationDate: string;
  revisionDate?: string;
  createdBy: string;
  reviewedBy?: string;
  objective: string;
  scope: string;
  concept?: string;
  tags: string[];
  sections: PolicySection[];
  snippets?: PolicySnippet[];
}
