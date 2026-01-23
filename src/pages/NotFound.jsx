import {Link} from 'react-router-dom'
function NotFound() {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6">

  <h1 class="text-4xl font-bold mb-6">
    VYOLO <span class="text-purple-500">Tech</span>
  </h1>

  <div class="mb-6">
    <div class="relative">
      <div class="w-32 h-20 bg-yellow-400 rounded-full blur-sm"></div>
      <div class="absolute left-10 top-8 w-0 h-0 border-l-8 border-r-8 border-b-16 border-yellow-500"></div>
    </div>
  </div>

  <h2 class="text-3xl font-bold mb-2">Oops! Page Not Found</h2>
  <p class="text-gray-400 text-center max-w-md">
    The page you are looking for might have been removed, renamed, or temporarily unavailable.
  </p>

  <Link to="/"
     class="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold hover:scale-105 transition">
    Go to Homepage
  </Link>

</div>

  )
}

export default NotFound