"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Maximize2, Minimize2 } from "lucide-react"
import * as THREE_NAMESPACE from "three"

// Enhanced planet data with texture URLs
const planetData = [
  {
    name: "Mercury",
    size: 0.38,
    distance: 4,
    color: "#8C7853",
    speed: 4.15,
    description: "Closest to the Sun",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Mercury",
  },
  {
    name: "Venus",
    size: 0.95,
    distance: 5.5,
    color: "#FFC649",
    speed: 1.62,
    description: "Hottest planet",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Venus",
  },
  {
    name: "Earth",
    size: 1,
    distance: 7,
    color: "#6B93D6",
    speed: 1,
    description: "Our home planet",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Earth",
  },
  {
    name: "Mars",
    size: 0.53,
    distance: 8.5,
    color: "#C1440E",
    speed: 0.53,
    description: "The Red Planet",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Mars",
  },
  {
    name: "Jupiter",
    size: 2.5,
    distance: 12,
    color: "#D8CA9D",
    speed: 0.084,
    description: "Largest planet",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Jupiter",
  },
  {
    name: "Saturn",
    size: 2.1,
    distance: 15,
    color: "#FAD5A5",
    speed: 0.034,
    description: "Has beautiful rings",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Saturn",
  },
  {
    name: "Uranus",
    size: 1.6,
    distance: 18,
    color: "#4FD0E7",
    speed: 0.012,
    description: "Ice giant",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Uranus",
  },
  {
    name: "Neptune",
    size: 1.55,
    distance: 21,
    color: "#4B70DD",
    speed: 0.006,
    description: "Farthest planet",
    textureUrl: "/placeholder.svg?height=512&width=1024&text=Neptune",
  },
]

// Animated background with nebulae and galaxies
function AnimatedBackground() {
  const starsRef = useRef<THREE_NAMESPACE.Points>(null)
  const nebula1Ref = useRef<THREE_NAMESPACE.Mesh>(null)
  const nebula2Ref = useRef<THREE_NAMESPACE.Mesh>(null)
  const galaxyRef = useRef<THREE_NAMESPACE.Points>(null)

  // Create star field
  const starPositions = useMemo(() => {
    const positions = new Float32Array(15000 * 3)
    for (let i = 0; i < 15000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    return positions
  }, [])

  // Create galaxy spiral
  const galaxyPositions = useMemo(() => {
    const positions = new Float32Array(8000 * 3)
    for (let i = 0; i < 8000; i++) {
      const radius = Math.random() * 300 + 100
      const angle = Math.random() * Math.PI * 4
      const spiral = angle * 0.3
      positions[i * 3] = Math.cos(angle + spiral) * radius + 400
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = Math.sin(angle + spiral) * radius + 400
    }
    return positions
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002
      starsRef.current.rotation.x += 0.0001
    }
    if (nebula1Ref.current) {
      nebula1Ref.current.rotation.z += 0.001
      nebula1Ref.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (nebula2Ref.current) {
      nebula2Ref.current.rotation.z -= 0.0008
      nebula2Ref.current.material.opacity = 0.2 + Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group>
      {/* Animated star field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={2} color="#ffffff" transparent opacity={0.8} />
      </points>

      {/* Distant galaxy */}
      <points ref={galaxyRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={galaxyPositions.length / 3}
            array={galaxyPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={1.5} color="#8A2BE2" transparent opacity={0.6} />
      </points>

      {/* Nebula effects */}
      <mesh ref={nebula1Ref} position={[-200, 100, -300]}>
        <sphereGeometry args={[150, 32, 32]} />
        <meshBasicMaterial color="#FF6B9D" transparent opacity={0.3} side={THREE_NAMESPACE.DoubleSide} />
      </mesh>

      <mesh ref={nebula2Ref} position={[300, -150, -400]}>
        <sphereGeometry args={[120, 32, 32]} />
        <meshBasicMaterial color="#4ECDC4" transparent opacity={0.2} side={THREE_NAMESPACE.DoubleSide} />
      </mesh>

      {/* Cosmic dust clouds */}
      <mesh position={[0, 200, -500]} rotation={[0.5, 0, 0.3]}>
        <planeGeometry args={[400, 200]} />
        <meshBasicMaterial color="#9B59B6" transparent opacity={0.1} side={THREE_NAMESPACE.DoubleSide} />
      </mesh>
    </group>
  )
}

interface PlanetProps {
  data: (typeof planetData)[0]
  speedMultiplier: number
  isPaused: boolean
  showLabels: boolean
  onHover: (planet: string | null) => void
}

function Planet({ data, speedMultiplier, isPaused, showLabels, onHover }: PlanetProps) {
  const meshRef = useRef<THREE_NAMESPACE.Mesh>(null)
  const groupRef = useRef<THREE_NAMESPACE.Group>(null)
  const glowRef = useRef<THREE_NAMESPACE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!isPaused && groupRef.current) {
      groupRef.current.rotation.y += data.speed * speedMultiplier * 0.01
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        position={[data.distance, 0, 0]}
        onPointerOver={() => {
          setHovered(true)
          onHover(data.name)
        }}
        onPointerOut={() => {
          setHovered(false)
          onHover(null)
        }}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[data.size * 0.5, 64, 64]} />
        <meshStandardMaterial color={data.color} roughness={0.8} metalness={0.1} />

        {/* Planet glow effect */}
        <mesh ref={glowRef} scale={1.2}>
          <sphereGeometry args={[data.size * 0.5, 32, 32]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.3} side={THREE_NAMESPACE.BackSide} />
        </mesh>

        {showLabels && hovered && (
          <Html distanceFactor={8} position={[0, data.size * 0.8, 0]}>
            <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-purple-500/30 pointer-events-none shadow-2xl">
              <div className="font-bold text-lg">{data.name}</div>
              <div className="text-sm opacity-90">{data.description}</div>
              <div className="text-xs opacity-70 mt-1">Speed: {speedMultiplier.toFixed(1)}x</div>
            </div>
          </Html>
        )}
      </mesh>

      {/* Enhanced orbit line with glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 128]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.4} side={THREE_NAMESPACE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Sun() {
  const meshRef = useRef<THREE_NAMESPACE.Mesh>(null)
  const coronaRef = useRef<THREE_NAMESPACE.Mesh>(null)
  const flareRef = useRef<THREE_NAMESPACE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.003
      coronaRef.current.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
    if (flareRef.current) {
      flareRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  return (
    <group>
      {/* Sun core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
        <pointLight intensity={3} distance={150} decay={2} />
      </mesh>

      {/* Sun corona */}
      <mesh ref={coronaRef} scale={1.3}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#FF8C00" transparent opacity={0.6} side={THREE_NAMESPACE.BackSide} />
      </mesh>

      {/* Sun flare */}
      <mesh ref={flareRef} scale={2}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.2} side={THREE_NAMESPACE.BackSide} />
      </mesh>
    </group>
  )
}

function Scene({
  planetSpeeds,
  isPaused,
  showLabels,
  onHover,
}: {
  planetSpeeds: number[]
  isPaused: boolean
  showLabels: boolean
  onHover: (planet: string | null) => void
}) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      <AnimatedBackground />
      <Sun />

      {planetData.map((planet, index) => (
        <Planet
          key={planet.name}
          data={planet}
          speedMultiplier={planetSpeeds[index]}
          isPaused={isPaused}
          showLabels={showLabels}
          onHover={onHover}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={100}
        autoRotate={false}
      />
    </>
  )
}

export default function SolarSystemSimulation() {
  const [planetSpeeds, setPlanetSpeeds] = useState<number[]>(new Array(8).fill(1))
  const [isPaused, setIsPaused] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const updatePlanetSpeed = (index: number, speed: number) => {
    const newSpeeds = [...planetSpeeds]
    newSpeeds[index] = speed
    setPlanetSpeeds(newSpeeds)
  }

  const resetSpeeds = () => {
    setPlanetSpeeds(new Array(8).fill(1))
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`w-full h-screen ${darkMode ? "bg-black" : "bg-gray-900"} relative overflow-hidden`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black/40 animate-pulse" />

      {/* Beautiful Website Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-md border border-purple-500/30 rounded-2xl px-8 py-4 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 text-center tracking-wide">
            ✨ COSMIC EXPLORER ✨
          </h1>
          <p className="text-sm text-gray-300 text-center mt-1 opacity-80">Interactive 3D Solar System Simulation</p>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 25, 35], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="absolute inset-0"
      >
        <Scene planetSpeeds={planetSpeeds} isPaused={isPaused} showLabels={showLabels} onHover={setHoveredPlanet} />
      </Canvas>

      {/* Toggle Controls Button */}
      <Button
        onClick={() => setShowControls(!showControls)}
        className="absolute top-4 left-4 z-50 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm border border-purple-500/30"
        size="sm"
      >
        {showControls ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </Button>

      {/* Enhanced Control Panel */}
      {showControls && (
        <div className="absolute top-16 left-4 w-80 max-h-[calc(100vh-5rem)] overflow-y-auto z-40">
          <Card className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md border border-purple-500/30 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-white flex items-center gap-2">🌌 Solar System Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Controls */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={togglePause}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-purple-600/20 border-purple-500/30 text-white hover:bg-purple-600/40"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button
                  onClick={resetSpeeds}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-blue-600/20 border-blue-500/30 text-white hover:bg-blue-600/40"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              {/* Toggle Controls */}
              <div className="space-y-3 p-3 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <Label className="text-white font-medium">🏷️ Show Labels</Label>
                  <Switch checked={showLabels} onCheckedChange={setShowLabels} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white font-medium">🌙 Dark Mode</Label>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>

              {/* Planet Speed Controls */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">🚀 Orbital Speed Controls</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {planetData.map((planet, index) => (
                    <div key={planet.name} className="space-y-2 p-3 bg-black/20 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-bold" style={{ color: planet.color }}>
                          {planet.name}
                        </Label>
                        <span className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded">
                          {planetSpeeds[index].toFixed(1)}x
                        </span>
                      </div>
                      <Slider
                        value={[planetSpeeds[index]]}
                        onValueChange={(value) => updatePlanetSpeed(index, value[0])}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-400">{planet.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Planet Info Display */}
      {hoveredPlanet && (
        <div className="absolute top-4 right-4 z-40">
          <Card className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-md border border-purple-500/30 shadow-2xl">
            <CardContent className="p-4">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">🪐 {hoveredPlanet}</h3>
              <p className="text-sm text-gray-300 mt-1">
                {planetData.find((p) => p.name === hoveredPlanet)?.description}
              </p>
              <div className="mt-2 text-xs text-gray-400">
                Current Speed: {planetSpeeds[planetData.findIndex((p) => p.name === hoveredPlanet)]?.toFixed(1)}x
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Instructions */}
      <div className="absolute bottom-20 right-4 z-40">
        <Card className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md border border-purple-500/30 shadow-2xl">
          <CardContent className="p-3">
            <div className="text-xs text-gray-300 space-y-1">
              <div className="font-bold text-white mb-2">🎮 Controls:</div>
              <div>• 🖱️ Drag to rotate view</div>
              <div>• 🔍 Scroll to zoom in/out</div>
              <div>• 👆 Hover planets for details</div>
              <div>• ⚡ Adjust orbital speeds</div>
              <div>• ⏸️ Pause/Resume animation</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Beautiful Footer Credit */}
      <div className="absolute bottom-4 left-4 z-40">
        <div className="bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-purple-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl px-6 py-3 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              CRAFTED BY
            </span>
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300">
              JAYRAJ
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center pointer-events-none">
        <div className="animate-pulse">
          <div className="text-2xl font-bold mb-2">🌌 Loading Solar System...</div>
          <div className="text-sm opacity-70">Preparing the universe for you</div>
        </div>
      </div>
    </div>
  )
}
