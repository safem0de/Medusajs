const SkeletonInput = () => (
    <div className="animate-pulse">
      <div className="h-4 w-1/4 bg-gray-300 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 rounded" />
    </div>
  )
  
  const SkeletonForm = ({ numberOfFields = 4 }: { numberOfFields?: number }) => {
    return (
      <div className="w-full max-w-md space-y-6" data-testid="skeleton-form-loader">
        {Array.from({ length: numberOfFields }).map((_, idx) => (
          <SkeletonInput key={idx} />
        ))}
        <div className="h-10 w-full bg-gray-300 rounded" /> {/* Button */}
      </div>
    )
  }
  
  export default SkeletonForm
  