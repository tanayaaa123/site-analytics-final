import { Car } from 'lucide-react'

export default function CarMedia({ car, className = '' }) {
  if (car.image) {
    return (
      <img
        src={car.cut || car.image}
        alt={car.name}
        className={`w-full h-full object-contain p-3 drop-shadow-xl ${className}`}
      />
    )
  }

  const isDark = car.accent === '#1A1A1A' || car.accent === '#C8433D'

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(180deg, ${car.accent}22, ${car.accent}44)`,
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
        style={{ backgroundColor: car.accent }}
      >
        <Car size={30} color={isDark ? '#fff' : '#0E2A47'} strokeWidth={1.75} />
      </div>
    </div>
  )
}
