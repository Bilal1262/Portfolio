import mongoose, { Schema, type Model } from 'mongoose'

export type ProjectCategory =
  | 'Perception'
  | 'Localization'
  | 'Planning'
  | 'Reinforcement Learning'
  | 'Others'

export interface IProject {
  title: string
  description: string
  technologies: string[]
  image: string
  category: ProjectCategory
  demoLink?: string
  githubLink?: string
  createdAt?: Date
  updatedAt?: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this project'],
      maxlength: [60, 'Title cannot be more than 60 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for this project'],
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    technologies: {
      type: [String],
      required: [true, 'Please provide at least one technology']
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL']
    },
    category: {
      type: String,
      required: [true, 'Please specify the category'],
      enum: ['Perception', 'Localization', 'Planning', 'Reinforcement Learning', 'Others']
    },
    demoLink: String,
    githubLink: String
  },
  { timestamps: true }
)

// ✅ This line prevents the union-type problem
const ProjectModel: Model<IProject> =
  (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>('Project', ProjectSchema)

export default ProjectModel