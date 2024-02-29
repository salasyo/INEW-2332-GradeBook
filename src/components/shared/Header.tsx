import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src="/assets/images/gradebook.svg" width={128} height={38} alt="Gradebook Logo" />
        </Link>
      </div>
      
    </header>
  )
}

export default Header