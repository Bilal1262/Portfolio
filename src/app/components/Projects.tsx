'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  category: 'Localization' | 'Perception' | 'Planning' | 'Reinforcement Learning' | 'Others'
  coverImage: string
  images?: string[]
  videoUrl?: string
  demoLink?: string
  githubLink?: string
  date?: string
}

const DEFAULT_PROJECTS: Project[] = [
  {
    _id: 'depth-underwater-2025',
    title: 'Self-Supervised Depth Estimation using Stereo Cameras (Personal Project in Initial phase)',
    date: '01/10/2025 – Current',
    description:
      'Designed a self-supervised pipeline for underwater depth prediction using StereoNet, contrastive pretraining (MoCo), student–teacher consistency, and domain-specific augmentations.',
    technologies: [
      'PyTorch',
      'StereoNet',
      'Self-Supervised Learning',
      'MoCo',
      'Contrastive Learning',
      'Disparity Estimation',
      'Underwater Imaging'
    ],
    category: 'Perception',
    coverImage: '/projects_picture/self_supervised_cover.png',
    images: [''],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'sonar-recon-2025',
    title: '3D Reconstruction of Offshore Floating Wind Turbines using Multi Modal Sensor',
    date: '01/10/2025 – Current',
    description:
      'Internship project at COE MARBLE focused on resolving vertical ambiguity in sonar data for 3D reconstruction of offshore structures. Fused AUV pose with sonar features, implemented a particle filter for height estimation, and generated dense 3D point clouds.',
    technologies: [
      'Sonar Processing',
      'Particle Filter',
      'Pose Fusion',
      '3D Reconstruction',
      'Underwater Mapping',
      'Data Fusion',
      'Point Clouds'
    ],
    category: 'Others',
    coverImage: '/projects_picture/sonar_cover.png',
    images: ['/projects_picture/sonar_project1.png', '/projects_picture/sonar_project2.png', '/projects_picture/sonar_project3.png', '/projects_picture/sonar_project4.png', '/projects_picture/sonar_project5.png', '/projects_picture/sonar_project6.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },

  {
    _id: 'minigirona-auv-2024',
    title: 'MiniGirona – Automated Underwater Vehicle (CIRS Lab, University of Girona)',
    date: '10/11/2024 – Current',
    description:
      'Underwater inspection, localization, and manipulation project at CIRS Lab. Developing algorithms for planning, localization, perception, and intervention. Preparing for an underwater robotics competition with MiniGirona.',
    technologies: [
      'Underwater Robotics',
      'Planning',
      'Localization',
      'Perception',
      'Intervention',
      'AUV Systems'
    ],
    category: 'Others',
    coverImage: '/projects_picture/minigirona_2.png',
    images: ['/projects_picture/minigirona_1.png', '/projects_picture/minigirona_2.png', '/projects_picture/minigirona_3.png', '/projects_picture/minigirona_4.png', '/projects_picture/minigirona_5.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },

    {
    _id: 'voting_based',
    title: 'Voting-Based System for Localization Initialization (CIRS Lab, University of Girona)',
    date: '10/11/2024 – Current',
    description:
      'During the starting of Localization, as we know that we have to initialize the filter with some local frame here we have choosed the frame of the pool where we have choosed the one corner of the pool as our initial frame. and then we have used the voting based algorith  which used the mechanical sonar and the yaw of the robot to predict the current position of the robot in the pool with respect to the initial frame.',
    technologies: [
      'Underwater Robotics',
      'Planning',
      'Localization',
      'Perception',
      'Intervention',
      'AUV Systems'
    ],
    category: 'Others',
    coverImage: '/projects_picture/voting_based2.png',
    images: ['/projects_picture/voting_based1.png', '/projects_picture/voting_based2.png', '/projects_picture/voting_based3.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },


  {
    _id: 'keypoints-stereo-2025',
    title: 'Keypoint Extraction for Manipulation & Path Planning using Stereo Cameras',
    date: '02/02/2025 – 07/07/2025',
    description:
      'Built a pipeline for detecting valves, buoys, and damaged areas for manipulation. Applied USLN for color correction, YOLOE for zero-shot detection, stereo disparity estimation, and keypoint extraction via PCA and clustering. Won 1st prize in research presentation competition.',
    technologies: [
      'Underwater Image Enhancement',
      'USLN',
      'YOLOE',
      'Stereo Disparity',
      'Point Clouds',
      'Keypoint Extraction',
      'PCA',
      'Clustering',
      'Manipulation Perception'
    ],
    category: 'Perception',
    coverImage: '/projects_picture/key_feature1.png',
    images: ['/projects_picture/key_feature1.png', '/projects_picture/key_feature2.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'turtlebot-slam-ros2-2025',
    title: 'SLAM – TurtleBot using LiDAR in ROS2',
    date: '05/02/2025 – Current',
    description:
      'Implemented SLAM for TurtleBot in simulation and now working on ROS2 implementation. Next step is deployment on a real robot.',
    technologies: ['ROS2', 'SLAM', 'LiDAR', 'TurtleBot', 'Mapping', 'Localization'],
    category: 'Localization',
    coverImage: '/projects/turtlebot/cover.jpg',
    images: ['/projects/turtlebot/1.jpg'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'path-planning-sim-2024',
    title: 'Simulation – Robot Path Planning (Potential Field, Wavefront, A*, RRT, RRT*)',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Implemented multiple path planning algorithms to compute optimal paths from start to goal in simulation, comparing behavior and performance.',
    technologies: ['Path Planning', 'A*', 'RRT', 'RRT*', 'Wavefront Planner', 'Potential Field', 'Simulation'],
    category: 'Planning',
    coverImage: '/projects/planning/cover.jpg',
    images: ['/projects/planning/1.jpg', '/projects/planning/2.jpg'],
    demoLink:
      'https://drive.google.com/drive/folders/11Ax14OU1zgr5tUh25LctUbYXZz0vCJmb?usp=drive_link',
    githubLink: ''
  },
  {
    _id: 'navigation-minigirona-2025',
    title: 'Navigation System for MiniGirona using DVL and Mechanical Imaging Sonar',
    date: '02/02/2025 – 07/07/2025',
    description:
      'Developed underwater navigation and localization for MiniGirona using DVL and mechanical imaging sonar (GPS-denied). Implemented voting-based filter initialization, INS and constant-velocity motion models, and map-based localization with point-to-line EKF updates. Validated in simulation and real-world experiments.',
    technologies: [
      'Sensor Fusion',
      'EKF',
      'INS',
      'Probabilistic Motion Models',
      'Sonar Processing',
      'DVL',
      'Underwater Navigation',
      'Localization'
    ],
    category: 'Localization',
    coverImage: '/projects/navigation/cover.jpg',
    images: ['/projects/navigation/1.jpg', '/projects/navigation/2.jpg'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'localization-filters-2024',
    title: 'Localization of Differential Drive Robot (PF, KF, EKF) – Simulation',
    date: '15/09/2024 – 01/01/2025',
    description:
      'Studied robot localization in GPS-denied/indoor scenarios. Used odometry with noisy sensors and implemented Particle Filter, Kalman Filter, and Extended Kalman Filter for state estimation.',
    technologies: ['Localization', 'Particle Filter', 'Kalman Filter', 'EKF', 'Odometry', 'Simulation'],
    category: 'Localization',
    coverImage: '/projects/localization/cover.jpg',
    images: ['/projects/localization/1.jpg', '/projects/localization/2.jpg'],
    demoLink:
      'https://drive.google.com/drive/folders/1kmpMVzvTMQfsoiBdNLg0t4_Y-YFhmRYa?usp=drive_link',
    githubLink: ''
  }
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function toEmbedUrl(url: string) {
  if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/')
  if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/')
  return url
}

// ─── Project Detail Modal ────────────────────────────────────────────────────

function ProjectModal({
  project,
  isAdmin,
  onClose,
  onUpdate
}: {
  project: Project
  isAdmin: boolean
  onClose: () => void
  onUpdate: (updated: Project) => void
}) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editData, setEditData] = React.useState<Project>(project)
  const [activeImage, setActiveImage] = React.useState<string | null>(
    project.images && project.images.length > 0 ? project.images[0] : null
  )
  const [newImageUrl, setNewImageUrl] = React.useState('')

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const updated = { ...editData, images: [...(editData.images || []), newImageUrl.trim()] }
      setEditData(updated)
      setActiveImage(newImageUrl.trim())
      setNewImageUrl('')
    }
  }

  const handleRemoveImage = (idx: number) => {
    const updated = { ...editData, images: editData.images?.filter((_, i) => i !== idx) }
    setEditData(updated)
    if (activeImage === editData.images?.[idx]) {
      setActiveImage(updated.images?.[0] ?? null)
    }
  }

  const displayProject = isEditing ? editData : project

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto relative"
        >
          {/* Header image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
            <img
              src={displayProject.coverImage}
              alt={displayProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Admin edit toggle */}
            {isAdmin && (
              <div className="absolute top-4 left-4 flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setEditData(project); setIsEditing(false) }}
                      className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-full font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full font-medium transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
            )}

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2 inline-block">
                {displayProject.category}
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={e => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="block w-full text-xl sm:text-2xl font-bold text-white bg-white/10 border border-white/30 rounded-lg px-3 py-1 mt-1"
                />
              ) : (
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">{displayProject.title}</h2>
              )}
              {displayProject.date && (
                <p className="text-sm text-gray-300 mt-1">{displayProject.date}</p>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">

            {/* Description / Summary */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                Summary
              </h3>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={e => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  rows={5}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm resize-none"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{displayProject.description}</p>
              )}
            </div>

            {/* Video Section */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                Video
              </h3>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.videoUrl || ''}
                  onChange={e => setEditData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
                />
              ) : displayProject.videoUrl && displayProject.videoUrl.trim() !== '' ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border dark:border-gray-700">
                  <iframe
                    className="h-full w-full"
                    src={toEmbedUrl(displayProject.videoUrl)}
                    title={`${displayProject.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No video attached.</p>
              )}
            </div>

            {/* Image Gallery */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                Gallery
              </h3>

              {/* Admin: add image */}
              {isEditing && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage() } }}
                    placeholder="Image URL (paste and press Enter)"
                    className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}

              {(displayProject.images && displayProject.images.length > 0) ? (
                <div className="space-y-3">
                  {/* Main viewer */}
                  {activeImage && (
                    <div className="relative w-full rounded-xl overflow-hidden border dark:border-gray-700 bg-gray-100 dark:bg-gray-800" style={{ maxHeight: '380px' }}>
                      <img
                        src={activeImage}
                        alt="Selected"
                        className="w-full h-full object-contain"
                        style={{ maxHeight: '380px' }}
                      />
                    </div>
                  )}
                  {/* Thumbnails */}
                  <div className="flex gap-2 flex-wrap">
                    {displayProject.images?.map((img, i) => (
                      <div key={i} className="relative group">
                        <button
                          type="button"
                          onClick={() => setActiveImage(img)}
                          className={`block h-16 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                            activeImage === img
                              ? 'border-blue-500 scale-105'
                              : 'border-transparent hover:border-blue-300'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No images attached.</p>
              )}
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {displayProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(displayProject.demoLink || displayProject.githubLink) && (
              <div className="flex gap-4 pt-2 border-t dark:border-gray-800">
                {displayProject.demoLink && (
                  <a
                    href={displayProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {displayProject.githubLink && (
                  <a
                    href={displayProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:underline text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Add Project Form ────────────────────────────────────────────────────────

function AddProjectForm({
  onAdd,
  onClose
}: {
  onAdd: (project: Project) => void
  onClose: () => void
}) {
  const [formData, setFormData] = React.useState<Partial<Project>>({
    category: 'Others',
    technologies: [],
    images: []
  })
  const [techInput, setTechInput] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !formData.title ||
      !formData.description ||
      (formData.technologies?.length ?? 0) === 0 ||
      !formData.coverImage
    ) {
      alert('Please fill in all required fields and add at least one technology')
      return
    }
    onAdd(formData as Project)
    onClose()
  }

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault()
      setFormData(prev => ({ ...prev, technologies: [...(prev.technologies || []), techInput.trim()] }))
      setTechInput('')
    }
  }

  const handleTechAdd = () => {
    if (techInput.trim()) {
      setFormData(prev => ({ ...prev, technologies: [...(prev.technologies || []), techInput.trim()] }))
      setTechInput('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Add New Project</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="text"
              value={formData.date || ''}
              onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="e.g., 02/2025 – 07/2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies *</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.technologies?.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm flex items-center">
                  {tech}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({ ...prev, technologies: prev.technologies?.filter((_, i) => i !== index) }))
                    }
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                placeholder="Type and press Enter to add"
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <button type="button" onClick={handleTechAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover Image URL *</label>
            <input
              type="text"
              value={formData.coverImage || ''}
              onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="/projects/myproject/cover.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gallery Images (comma-separated URLs)</label>
            <input
              type="text"
              value={(formData.images || []).join(', ')}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  images: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                }))
              }
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="/projects/myproject/1.jpg, /projects/myproject/2.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Video URL (YouTube/Vimeo)</label>
            <input
              type="text"
              value={formData.videoUrl || ''}
              onChange={e => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Project['category'] }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="Perception">Perception</option>
              <option value="Localization">Localization</option>
              <option value="Planning">Planning</option>
              <option value="Reinforcement Learning">Reinforcement Learning</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Demo Link</label>
            <input
              type="text"
              value={formData.demoLink || ''}
              onChange={e => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GitHub Link</label>
            <input
              type="text"
              value={formData.githubLink || ''}
              onChange={e => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Project
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  isAdmin,
  onClick,
  onEdit,
  onDelete
}: {
  project: Project
  isAdmin: boolean
  onClick: () => void
  onEdit?: (e: React.MouseEvent) => void
  onDelete?: (e: React.MouseEvent) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium text-sm bg-black/50 px-4 py-2 rounded-full">
            View Details
          </span>
        </div>

        <div className="absolute top-4 right-4 flex gap-2 items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-white
            ${project.category === 'Perception'
              ? 'bg-purple-500'
              : project.category === 'Localization'
              ? 'bg-green-500'
              : project.category === 'Planning'
              ? 'bg-orange-500'
              : project.category === 'Reinforcement Learning'
              ? 'bg-rose-500'
              : 'bg-blue-500'}`}
          >
            {project.category}
          </span>

          {isAdmin && (
            <div className="flex gap-1">
              <button
                onClick={onEdit}
                className="p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600"
                title="Edit project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={onDelete}
                className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                title="Delete project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          {project.date && <p className="text-sm text-gray-500 dark:text-gray-400">{project.date}</p>}
        </div>

        <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-full text-sm">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        {/* Quick indicators */}
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          {project.images && project.images.length > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {project.images.length} image{project.images.length !== 1 ? 's' : ''}
            </span>
          )}
          {project.videoUrl && project.videoUrl.trim() !== '' && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Video
            </span>
          )}
          {(project.demoLink || project.githubLink) && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Links
            </span>
          )}
          <span className="ml-auto text-blue-500 dark:text-blue-400 font-medium text-xs group-hover:underline">
            Click to expand →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Projects() {
  const { data: session } = useSession()

  const [selectedCategory, setSelectedCategory] = React.useState<'all' | Project['category']>('all')
  const [showAddForm, setShowAddForm] = React.useState(false)
  const [projectsList, setProjectsList] = React.useState<Project[]>(DEFAULT_PROJECTS)
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [isLoading] = React.useState(false)

  const isAdmin = (session?.user as any)?.role === 'admin'

  const handleAddProject = async (newProject: Project) => {
    try {
      const projectWithId: Project = { ...newProject, _id: Date.now().toString() }
      setProjectsList(prev => [projectWithId, ...prev])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project. Please try again.')
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      setProjectsList(prev => prev.filter(project => project._id !== id))
      if (selectedProject?._id === id) setSelectedProject(null)
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project. Please try again.')
    }
  }

  const handleUpdateProject = (updated: Project) => {
    setProjectsList(prev => prev.map(p => (p._id === updated._id ? updated : p)))
    setSelectedProject(updated)
  }

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsList
      : projectsList.filter(project => project.category === selectedCategory)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Underwater robotics, perception, 3D reconstruction, SLAM, and AI systems
          </p>

          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Project
            </button>
          )}
        </motion.div>

        {/* Category filters */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(['all', 'Perception', 'Localization', 'Planning', 'Reinforcement Learning', 'Others'] as const).map(
            category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project._id}
              project={project}
              isAdmin={isAdmin}
              onClick={() => setSelectedProject(project)}
              onEdit={(e) => {
                e.stopPropagation()
                setSelectedProject(project)
              }}
              onDelete={(e) => {
                e.stopPropagation()
                handleDeleteProject(project._id)
              }}
            />
          ))}
        </div>

        {/* Modals */}
        {showAddForm && (
          <AddProjectForm onAdd={handleAddProject} onClose={() => setShowAddForm(false)} />
        )}

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isAdmin={isAdmin}
            onClose={() => setSelectedProject(null)}
            onUpdate={handleUpdateProject}
          />
        )}
      </div>
    </section>
  )
}