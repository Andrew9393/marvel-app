import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
      <p>Такой страницы не сушествует</p>
      <Link to = '/'>Go to Home Page</Link>
    </>
  )
}

export default Page404;