'use client'

import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useSession } from 'next-auth/react'

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

/**
 * ✅ NOTE (per your request)
 * - Image paths and video URLs are kept exactly as you provided.
 * - Only UI/UX + code structure + safety/edge cases are improved.
 */

const DEFAULT_PROJECTS: Project[] = [
  {
    _id: 'depth-underwater-2025',
    title: 'Self-Supervised Underwater Depth Estimation (Stereo Cameras)',
    date: '01/10/2025 – Current',
    description:
      'Building a self-supervised depth pipeline for underwater stereo: StereoNet baseline, contrastive pretraining (MoCo), student–teacher consistency, and underwater-specific augmentations.',
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
    title: '3D Reconstruction of Offshore Floating Wind Turbines (Multi-Modal Sensing)',
    date: '01/10/2025 – Current',
    description:
      'Internship at COE MARBLE: resolving vertical ambiguity in sonar reconstruction. Fusing AUV pose with sonar features, using a particle filter for height estimation, and generating dense 3D point clouds of offshore structures.',
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
    images: [
      '/projects_picture/sonar_project1.png',
      '/projects_picture/sonar_project2.png',
      '/projects_picture/sonar_project3.png',
      '/projects_picture/sonar_project4.png',
      '/projects_picture/sonar_project5.png',
      '/projects_picture/sonar_project6.png'
    ],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'minigirona-auv-2024',
    title: 'MiniGirona AUV (CIRS Lab, University of Girona)',
    date: '10/11/2024 – Current',
    description:
      'Underwater inspection, localization, and intervention work at CIRS Lab. Developing modules for perception, localization, planning, and manipulation, with competition-oriented integration on MiniGirona.',
    technologies: ['Underwater Robotics', 'Planning', 'Localization', 'Perception', 'Intervention', 'AUV Systems'],
    category: 'Others',
    coverImage: '/projects_picture/minigirona_2.png',
    images: [
      '/projects_picture/minigirona_1.png',
      '/projects_picture/minigirona_2.png',
      '/projects_picture/minigirona_3.png',
      '/projects_picture/minigirona_4.png',
      '/projects_picture/minigirona_5.png'
    ],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'voting_based',
    title: 'Voting-Based Localization Initialization (MiniGirona / Mechanical Sonar)',
    date: '10/11/2024 – Current',
    description:
      'Localization initialization in a known pool frame: using mechanical imaging sonar observations and robot yaw in a voting-based method to estimate initial pose before filter convergence.',
    technologies: ['Underwater Robotics', 'Localization', 'Sonar', 'Pose Estimation', 'Probabilistic Robotics'],
    category: 'Localization',
    coverImage: '/projects_picture/voting_based2.png',
    images: ['/projects_picture/voting_based1.png', '/projects_picture/voting_based2.png', '/projects_picture/voting_based3.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'keypoints-stereo-2025',
    title: 'Stereo Keypoint Extraction for Manipulation & Path Planning',
    date: '02/02/2025 – 07/07/2025',
    description:
      'Detecting valves/buoys/damage for manipulation: underwater color correction (USLN), zero-shot detection (YOLOE), stereo disparity, and 3D keypoint extraction via PCA + clustering.',
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
    title: 'SLAM on TurtleBot (LiDAR, ROS2)',
    date: '05/02/2025 – Current',
    description:
      'Implementing SLAM for TurtleBot in simulation with a ROS2 pipeline; preparing for deployment on the real robot.',
    technologies: ['ROS2', 'SLAM', 'LiDAR', 'TurtleBot', 'Mapping', 'Localization'],
    category: 'Localization',
    coverImage: '/projects_picture/turtlebot_localization.png',
    images: ['/projects_picture/turtlebot_localization.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'path-planning-sim-2024',
    title: 'Robot Path Planning in Simulation (PF, Wavefront, A*, RRT, RRT*)',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Implemented and compared classic planners in simulation, analyzing path quality and behavior under different environments and constraints.',
    technologies: ['Path Planning', 'A*', 'RRT', 'RRT*', 'Wavefront Planner', 'Potential Field', 'Simulation'],
    category: 'Planning',
    coverImage: '/projects_picture/path_planning_cover.png',
    images: [
      '/projects_picture/path_planning.png',
      '/projects_picture/path_planning2.png',
      '/projects_picture/path_planning3.png',
      '/projects_picture/path_planning4.png',
      '/projects_picture/path_planning5.png',
      '/projects_picture/path_planning6.png'
    ],
    videoUrl: 'https://youtu.be/I-3rC5znRv4?si=YGI6P2fIPHtMekq-',
    demoLink: 'https://drive.google.com/drive/folders/11Ax14OU1zgr5tUh25LctUbYXZz0vCJmb?usp=drive_link',
    githubLink: ''
  },
  {
    _id: 'localization-filters-2024',
    title: 'Differential Drive Localization (PF, KF, EKF) — Simulation',
    date: '15/09/2024 – 01/01/2025',
    description:
      'Localization in indoor/GPS-denied settings: odometry + noisy sensors with Particle Filter, Kalman Filter, and EKF for state estimation.',
    technologies: ['Localization', 'Particle Filter', 'Kalman Filter', 'EKF', 'Odometry', 'Simulation'],
    category: 'Localization',
    coverImage: '/projects_picture/sim_localization_cover.png',
    images: [
      '/projects_picture/sim_localization.png',
      '/projects_picture/sim_localization1.png',
      '/projects_picture/sim_localization2.png',
      '/projects_picture/sim_localization3.png',
      '/projects_picture/sim_localization4.png'
    ],
    demoLink: 'https://drive.google.com/drive/folders/1kmpMVzvTMQfsoiBdNLg0t4_Y-YFhmRYa?usp=drive_link',
    githubLink: ''
  },
  {
    _id: 'navigation-minigirona-2025',
    title: 'MiniGirona Navigation (DVL + Mechanical Imaging Sonar)',
    date: '02/02/2025 – 07/07/2025',
    description:
      'Underwater navigation and localization (GPS-denied): voting-based initialization, INS + constant-velocity motion models, and map-based localization using EKF point-to-line updates (validated in simulation and experiments).',
    technologies: ['Sensor Fusion', 'EKF', 'INS', 'Probabilistic Motion Models', 'Sonar Processing', 'DVL', 'Underwater Navigation', 'Localization'],
    category: 'Localization',
    coverImage: '/projects_picture/minig_localization_cover.png',
    images: [
      '/projects_picture/minig_localization.png',
      '/projects_picture/minig_localization1.png',
      '/projects_picture/minig_localization2.png',
      '/projects_picture/minig_localization3.png',
      '/projects_picture/minig_localization4.png',
      '/projects_picture/minig_localization5.png'
    ],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'minig_manipulation-2025',
    title: 'MiniGirona Manipulation (Alpha 5 Arm, Task Priority Control)',
    date: '15/09/2024 – 01/01/2025',
    description:
      'Underwater manipulation tasks with the Alpha 5 arm, including valve rotation and ring pickup using task-priority strategies.',
    technologies: ['Manipulation', 'Alpha 5 Arm', 'Underwater Robotics', 'Task Priority'],
    category: 'Others',
    coverImage: '/projects_picture/minig_manipulation_cover.png',
    images: ['/projects_picture/minig_manipulation.png', '/projects_picture/minig_manipulation1.png'],
    videoUrl: 'https://youtu.be/vyJ8t69w2wo?si=KJRzodRoIFRcG5dV',
    demoLink: 'https://drive.google.com/drive/folders/1kmpMVzvTMQfsoiBdNLg0t4_Y-YFhmRYa?usp=drive_link',
    githubLink: ''
  },
  {
    _id: 'minig_mission_planning-2025',
    title: 'MiniGirona Mission Planning (RAMI Competition 2025)',
    date: '15/09/2024 – 01/01/2025',
    description:
      'Mission-level planning for underwater tasks, integrating path and task sequencing aligned with RAMI-style objectives.',
    technologies: ['Mission Planning', 'Path Planning', 'Alpha 5 Arm', 'Underwater Robotics'],
    category: 'Planning',
    coverImage: '/projects_picture/minig_planning_cover.png',
    images: [''],
    videoUrl: 'https://youtu.be/Nc9D36YvdUA?si=p2Jk6TSjMpFsKZez',
    demoLink: 'https://drive.google.com/drive/folders/1kmpMVzvTMQfsoiBdNLg0t4_Y-YFhmRYa?usp=drive_link',
    githubLink: ''
  },
  {
    _id: 'path-planning-turtlebot-2024',
    title: 'RRT / RRT* on TurtleBot (Behavior Tree Integration)',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Implemented RRT and RRT* on TurtleBot and integrated execution using a behavior tree for structured navigation.',
    technologies: ['Path Planning', 'RRT', 'RRT*', 'Behavior Tree', 'TurtleBot', 'Simulation'],
    category: 'Planning',
    coverImage: '/projects_picture/turtlebot_plan.png',
    images: [
      '/projects_picture/path_planning.png',
      '/projects_picture/path_planning2.png',
      '/projects_picture/path_planning3.png',
      '/projects_picture/path_planning4.png',
      '/projects_picture/path_planning5.png',
      '/projects_picture/path_planning6.png'
    ],
    videoUrl: 'https://youtu.be/V_S-zIa8rDM?si=5M1PtDCct6faMe_G',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'color_enhancement_2025',
    title: 'Color Enhancement for Robot Perception (HSV, RGB, YCbCr)',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Implemented color-space based enhancement (HSV, RGB, YCbCr) to support downstream detection; evaluated behavior in simulation.',
    technologies: ['Color Enhancement', 'HSV', 'RGB', 'YCbCr', 'Simulation'],
    category: 'Perception',
    coverImage: '/projects_picture/turtlebot_plan.png',
    images: [
      '/projects_picture/path_planning.png',
      '/projects_picture/path_planning2.png',
      '/projects_picture/path_planning3.png',
      '/projects_picture/path_planning4.png',
      '/projects_picture/path_planning5.png',
      '/projects_picture/path_planning6.png'
    ],
    videoUrl: 'https://youtu.be/V_S-zIa8rDM?si=5M1PtDCct6faMe_G',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'reinforcement_learning_as',
    title: 'Autonomous Path Planning via Q-Learning',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Implemented Q-Learning for navigation in a simulated environment and compared behavior against classic planners.',
    technologies: ['Reinforcement Learning', 'Q-Learning', 'Path Planning', 'Simulation'],
    category: 'Reinforcement Learning',
    coverImage: '/projects_picture/rl_As_cover.png',
    images: ['/projects_picture/rl_As.png', '/projects_picture/rl_As2.png', '/projects_picture/rl_As3.png', '/projects_picture/rl_As4.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'visual-odometry',
    title: 'Stereo Visual SLAM Framework (KITTI Dataset)',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Developed a stereo visual SLAM pipeline and evaluated performance on the KITTI dataset.',
    technologies: ['Visual SLAM', 'Stereo Cameras', 'KITTI Dataset', 'Computer Vision'],
    category: 'Perception',
    coverImage: '/projects_picture/visual_odometry_cover.png',
    images: ['/projects_picture/visual_odometry.png', '/projects_picture/visual_odometry2.png', '/projects_picture/visual_odometry3.png', '/projects_picture/visual_odometry4.png', '/projects_picture/visual_odometry5.png', '/projects_picture/visual_odometry6.png', '/projects_picture/visual_odometry.png'],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'human-robot-interaction',
    title: 'LLM–VLM Smart Home Assistant (Face + Gesture Interaction on TiAGo)',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Built a smart home assistant combining LLM/VLM modules with face-activated and gesture-based interaction on the TiAGo robot.',
    technologies: ['Human-Robot Interaction', 'TiAGo Robot', 'LLM', 'VLM'],
    category: 'Others',
    coverImage: '/projects_picture/hri_cover.png',
    images: [''],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'reynolds-rules',
    title: 'Swarm Control via Reynolds Rules',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Implemented flocking-style swarm control using Reynolds rules for multi-agent simulation.',
    technologies: ['Swarm Intelligence', 'Reynolds Rules', 'Multi-Agent Systems'],
    category: 'Planning',
    coverImage: '/projects_picture/swarm_control.png',
    images: [''],
    videoUrl: 'https://youtu.be/9Q8QMtbf99w?si=HSGPEfuFVY8H6FN1',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'consensus',
    title: 'Controlling a Swarm of Crazyflies using Consensus Protocol and Auction-Based Task Allocation',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Implemented consensus-based formation control for multi-agent systems and connected it with mission-level planning logic.',
    technologies: ['Swarm Intelligence', 'Consensus Algorithm', 'Multi-Agent Systems'],
    category: 'Planning',
    coverImage: '/projects_picture/consensus.png',
    images: [''],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  },
  {
    _id: 'reinforcement-learning-pid',
    title: 'RL-Based PID Tuning for Drone Height + Position Control',
    date: '15/09/2024 – 15/12/2024',
    description:
      'Applied reinforcement learning to tune PID gains for drone height and position control in simulation.',
    technologies: ['Reinforcement Learning', 'PID Tuning', 'Control', 'Simulation'],
    category: 'Reinforcement Learning',
    coverImage: '/projects_picture/pid_tunning.png',
    images: [''],
    videoUrl: '',
    demoLink: '',
    githubLink: ''
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

function safeArray(a?: string[]) {
  return (a ?? []).map(s => s?.trim()).filter(Boolean)
}

function parseStartDate(dateRange?: string) {
  // Handles "DD/MM/YYYY – ..." and returns a timestamp; if missing/invalid returns 0.
  if (!dateRange) return 0
  const match = dateRange.match(/(\d{2})\/(\d{2})\/(\d{4})/)
  if (!match) return 0
  const [, dd, mm, yyyy] = match
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
  const t = d.getTime()
  return Number.isFinite(t) ? t : 0
}

function parseYouTubeTime(t: string) {
  // supports: "90", "90s", "1m30s", "2m", "1h2m3s"
  const raw = t.trim().toLowerCase()
  if (/^\d+$/.test(raw)) return Number(raw)
  const re = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/
  const m = raw.match(re)
  if (!m) return 0
  const h = Number(m[1] || 0)
  const min = Number(m[2] || 0)
  const s = Number(m[3] || 0)
  return h * 3600 + min * 60 + s
}

function toEmbedUrl(url: string) {
  // Robust YouTube handling (keeps your original URLs unchanged; only embed is derived)
  try {
    const u = new URL(url)
    const host = u.hostname.replace('www.', '')

    // YouTube
    if (host === 'youtu.be') {
      const id = u.pathname.replace('/', '')
      if (!id) return url
      const start = u.searchParams.get('t') || u.searchParams.get('start')
      const qp = new URLSearchParams()
      if (start) qp.set('start', String(parseYouTubeTime(start)))
      return `https://www.youtube.com/embed/${id}${qp.toString() ? `?${qp.toString()}` : ''}`
    }

    if (host.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (!id) return url
      const start = u.searchParams.get('t') || u.searchParams.get('start')
      const qp = new URLSearchParams()
      if (start) qp.set('start', String(parseYouTubeTime(start)))
      return `https://www.youtube.com/embed/${id}${qp.toString() ? `?${qp.toString()}` : ''}`
    }

    // Vimeo basic support
    if (host.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0]
      if (!id) return url
      return `https://player.vimeo.com/video/${id}`
    }

    return url
  } catch {
    return url
  }
}

const CATEGORY_STYLES: Record<Project['category'], string> = {
  Perception: 'bg-purple-600',
  Localization: 'bg-emerald-600',
  Planning: 'bg-orange-600',
  'Reinforcement Learning': 'bg-rose-600',
  Others: 'bg-blue-600'
}

const CATEGORIES = ['all', 'Perception', 'Localization', 'Planning', 'Reinforcement Learning', 'Others'] as const

// ─────────────────────────────────────────────────────────────────────────────
// Project Detail Modal
// ─────────────────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500 mb-2">
      {children}
    </h3>
  )
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

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
  const reduceMotion = useReducedMotion()
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editData, setEditData] = React.useState<Project>(project)

  const normalizedImages = React.useMemo(() => safeArray((isEditing ? editData.images : project.images) ?? []), [
    isEditing,
    editData.images,
    project.images
  ])

  const [activeImage, setActiveImage] = React.useState<string | null>(normalizedImages[0] ?? null)
  const [newImageUrl, setNewImageUrl] = React.useState('')

  React.useEffect(() => {
    // Keep state in sync if a different project is opened
    setIsEditing(false)
    setEditData(project)
  }, [project])

  React.useEffect(() => {
    setActiveImage(normalizedImages[0] ?? null)
  }, [project._id, normalizedImages])

  // Close on Escape
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll
  React.useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Focus close button on open
  React.useEffect(() => {
    closeBtnRef.current?.focus()
  }, [])

  const displayProject = isEditing ? editData : project

  const handleSave = () => {
    const cleaned: Project = {
      ...editData,
      title: editData.title.trim(),
      description: editData.description.trim(),
      technologies: editData.technologies.map(t => t.trim()).filter(Boolean),
      images: safeArray(editData.images),
      videoUrl: (editData.videoUrl ?? '').trim(),
      demoLink: (editData.demoLink ?? '').trim(),
      githubLink: (editData.githubLink ?? '').trim(),
      date: (editData.date ?? '').trim()
    }
    onUpdate(cleaned)
    setIsEditing(false)
  }

  const handleAddImage = () => {
    const v = newImageUrl.trim()
    if (!v) return
    const updated = { ...editData, images: [...safeArray(editData.images), v] }
    setEditData(updated)
    setActiveImage(v)
    setNewImageUrl('')
  }

  const handleRemoveImage = (idx: number) => {
    const imgs = safeArray(editData.images)
    const removed = imgs[idx]
    const updated = { ...editData, images: imgs.filter((_, i) => i !== idx) }
    setEditData(updated)
    if (activeImage === removed) {
      setActiveImage(updated.images?.[0] ?? null)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Project details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto relative"
        >
          {/* Header image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
            <img
              src={displayProject.coverImage}
              alt={displayProject.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            {/* Close */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/55 hover:bg-black/75 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
              aria-label="Close"
            >
              <IconX className="w-5 h-5" />
            </button>

            {/* Admin edit */}
            {isAdmin && (
              <div className="absolute top-4 left-4 flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-full font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditData(project)
                        setIsEditing(false)
                      }}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-full font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full font-medium transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span
                className={cn('px-3 py-1 text-white text-xs font-medium rounded-full mb-2 inline-block', CATEGORY_STYLES[displayProject.category])}
              >
                {displayProject.category}
              </span>

              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                  className="block w-full text-xl sm:text-3xl font-bold text-white bg-white/10 border border-white/25 rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-white/60"
                />
              ) : (
                <h2 className="text-xl sm:text-3xl font-bold text-white mt-1">{displayProject.title}</h2>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={editData.date || ''}
                  onChange={(e) => setEditData((prev) => ({ ...prev, date: e.target.value }))}
                  placeholder="e.g., 02/2025 – 07/2025"
                  className="mt-2 w-full sm:w-[360px] text-sm text-white bg-white/10 border border-white/25 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-white/60"
                />
              ) : (
                displayProject.date && <p className="text-sm text-gray-200/90 mt-2">{displayProject.date}</p>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7 space-y-7">
            {/* Summary */}
            <div>
              <SectionTitle>Summary</SectionTitle>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={5}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{displayProject.description}</p>
              )}
            </div>

            {/* Video */}
            <div>
              <SectionTitle>Video</SectionTitle>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.videoUrl || ''}
                  onChange={(e) => setEditData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              ) : displayProject.videoUrl && displayProject.videoUrl.trim() !== '' ? (
                <div className="aspect-video w-full overflow-hidden rounded-2xl border dark:border-gray-700 bg-black">
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

            {/* Gallery */}
            <div>
              <SectionTitle>Gallery</SectionTitle>

              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddImage()
                      }
                    }}
                    placeholder="Image URL (paste and press Enter)"
                    className="flex-1 px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}

              {normalizedImages.length > 0 ? (
                <div className="space-y-3">
                  {activeImage && (
                    <div
                      className="relative w-full rounded-2xl overflow-hidden border dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                      style={{ maxHeight: '420px' }}
                    >
                      <img
                        src={activeImage}
                        alt="Selected"
                        className="w-full h-full object-contain"
                        style={{ maxHeight: '420px' }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {normalizedImages.map((img, i) => (
                      <div key={`${img}-${i}`} className="relative group">
                        <button
                          type="button"
                          onClick={() => setActiveImage(img)}
                          className={cn(
                            'block w-full aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all bg-gray-100 dark:bg-gray-800',
                            activeImage === img ? 'border-blue-500' : 'border-transparent hover:border-blue-300'
                          )}
                          aria-label={`Open image ${i + 1}`}
                        >
                          <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </button>

                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Remove image ${i + 1}`}
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
              <SectionTitle>Technologies</SectionTitle>
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editData.technologies.join(', ')}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
                    placeholder="Comma-separated: ROS2, EKF, ..."
                  />
                  <p className="text-xs text-gray-400">Tip: use comma-separated values.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {displayProject.technologies.map((tech, i) => (
                    <span
                      key={`${tech}-${i}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div>
              <SectionTitle>Links</SectionTitle>

              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={editData.demoLink || ''}
                    onChange={(e) => setEditData((prev) => ({ ...prev, demoLink: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
                    placeholder="Demo link"
                  />
                  <input
                    type="text"
                    value={editData.githubLink || ''}
                    onChange={(e) => setEditData((prev) => ({ ...prev, githubLink: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
                    placeholder="GitHub link"
                  />
                </div>
              ) : (displayProject.demoLink || displayProject.githubLink) ? (
                <div className="flex flex-wrap gap-3 pt-1">
                  {displayProject.demoLink && (
                    <a
                      href={displayProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Live Demo
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                  {displayProject.githubLink && (
                    <a
                      href={displayProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      View Code
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No links attached.</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Add Project Form (Admin)
// ─────────────────────────────────────────────────────────────────────────────

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
    if (!formData.title || !formData.description || (formData.technologies?.length ?? 0) === 0 || !formData.coverImage) {
      alert('Please fill in all required fields and add at least one technology.')
      return
    }

    const cleaned: Project = {
      _id: crypto?.randomUUID?.() ?? Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: (formData.technologies ?? []).map(t => t.trim()).filter(Boolean),
      category: formData.category ?? 'Others',
      coverImage: formData.coverImage,
      images: safeArray(formData.images),
      videoUrl: (formData.videoUrl ?? '').trim(),
      demoLink: (formData.demoLink ?? '').trim(),
      githubLink: (formData.githubLink ?? '').trim(),
      date: (formData.date ?? '').trim()
    }

    onAdd(cleaned)
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Project</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Close">
            <IconX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="text"
              value={formData.date || ''}
              onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="e.g., 02/2025 – 07/2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies *</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.technologies?.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded-full text-sm flex items-center text-gray-800 dark:text-gray-100"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, technologies: prev.technologies?.filter((_, i) => i !== index) }))}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${tech}`}
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
                className="flex-1 px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <button type="button" onClick={handleTechAdd} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
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
              className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="/projects_picture/cover.png"
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
              className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="/projects_picture/1.png, /projects_picture/2.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Video URL (YouTube/Vimeo)</label>
            <input
              type="text"
              value={formData.videoUrl || ''}
              onChange={e => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Project['category'] }))}
              className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              required
            >
              <option value="Perception">Perception</option>
              <option value="Localization">Localization</option>
              <option value="Planning">Planning</option>
              <option value="Reinforcement Learning">Reinforcement Learning</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Demo Link</label>
              <input
                type="text"
                value={formData.demoLink || ''}
                onChange={e => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
                className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Link</label>
              <input
                type="text"
                value={formData.githubLink || ''}
                onChange={e => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
                className="w-full px-3 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Add Project
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────────────────────────────────────────

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
  const imgCount = safeArray(project.images).length

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.35 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer group border border-transparent hover:border-blue-500/20"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-70 pointer-events-none" />

        <div className="absolute top-4 right-4 flex gap-2 items-center">
          <span
            className={cn('px-3 py-1 rounded-full text-xs font-medium text-white', CATEGORY_STYLES[project.category])}
          >
            {project.category}
          </span>

          {isAdmin && (
            <div className="flex gap-1">
              <button
                onClick={onEdit}
                className="p-1.5 bg-white/90 rounded-full text-gray-900 hover:bg-white"
                title="Edit project"
                aria-label="Edit project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                title="Delete project"
                aria-label="Delete project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Hover hint */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          {project.date && (
            <span className="text-xs text-white/85 bg-black/35 px-3 py-1 rounded-full">
              {project.date}
            </span>
          )}
          <span className="text-xs text-white/85 bg-black/35 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            View details →
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-full text-xs sm:text-sm">
              +{project.technologies.length - 6} more
            </span>
          )}
        </div>

        {/* Quick indicators */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          {imgCount > 0 && <span>{imgCount} image{imgCount !== 1 ? 's' : ''}</span>}
          {project.videoUrl && project.videoUrl.trim() !== '' && <span>Video</span>}
          {(project.demoLink || project.githubLink) && <span>Links</span>}
          <span className="ml-auto text-blue-600/90 dark:text-blue-400/90 font-medium">
            Click to expand
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Projects() {
  const { data: session } = useSession()
  const isAdmin = (session?.user as any)?.role === 'admin'
  const reduceMotion = useReducedMotion()

  const [selectedCategory, setSelectedCategory] = React.useState<'all' | Project['category']>('all')
  const [query, setQuery] = React.useState('')
  const [sort, setSort] = React.useState<'recent' | 'title'>('recent')

  const [showAddForm, setShowAddForm] = React.useState(false)
  const [projectsList, setProjectsList] = React.useState<Project[]>(DEFAULT_PROJECTS)
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)

  const normalizedProjects = React.useMemo(() => {
    return projectsList.map((p) => ({
      ...p,
      images: safeArray(p.images),
      technologies: (p.technologies ?? []).map(t => t.trim()).filter(Boolean)
    }))
  }, [projectsList])

  const filteredProjects = React.useMemo(() => {
    const q = query.trim().toLowerCase()

    const base =
      selectedCategory === 'all'
        ? normalizedProjects
        : normalizedProjects.filter((p) => p.category === selectedCategory)

    const searched = !q
      ? base
      : base.filter((p) => {
          const hay = `${p.title} ${p.description} ${p.category} ${p.technologies.join(' ')}`.toLowerCase()
          return hay.includes(q)
        })

    const sorted = [...searched].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      return parseStartDate(b.date) - parseStartDate(a.date)
    })

    return sorted
  }, [normalizedProjects, selectedCategory, query, sort])

  const handleAddProject = (newProject: Project) => {
    setProjectsList((prev) => [newProject, ...prev])
    setShowAddForm(false)
  }

  const handleDeleteProject = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    setProjectsList((prev) => prev.filter((p) => p._id !== id))
    if (selectedProject?._id === id) setSelectedProject(null)
  }

  const handleUpdateProject = (updated: Project) => {
    setProjectsList((prev) => prev.map((p) => (p._id === updated._id ? updated : p)))
    setSelectedProject(updated)
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Underwater robotics, perception, 3D reconstruction, SLAM, planning, and AI systems.
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6 bg-gray-50/90 dark:bg-gray-950/90 backdrop-blur border-y border-gray-200/60 dark:border-gray-800/60">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, tech, or keyword…"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                {query.trim() && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/40"
                aria-label="Sort"
              >
                <option value="recent">Sort: Recent</option>
                <option value="title">Sort: Title</option>
              </select>
            </div>

            {/* Admin add */}
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Project
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === (category as any)
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as any)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200/80 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800'
                  )}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              )
            })}
          </div>

          {/* Result count */}
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-700 dark:text-gray-200">{filteredProjects.length}</span>{' '}
            project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-14">
            <p className="text-gray-600 dark:text-gray-300">No projects match your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setQuery('')
              }}
              className="mt-3 inline-flex px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
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
          </motion.div>
        )}

        {/* Modals */}
        {showAddForm && <AddProjectForm onAdd={handleAddProject} onClose={() => setShowAddForm(false)} />}

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