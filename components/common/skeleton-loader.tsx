export default function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-muted rounded-lg h-32" />
      ))}
    </div>
  )
}
