import './Loader.css'

interface LoaderProps {
  message: string
}

export default function Loader({ message }: LoaderProps) {
  return (
    <div className="loader" role="status">
      <span className="loader__spinner" aria-hidden="true"></span>
      <p>{message}</p>
    </div>
  )
}
