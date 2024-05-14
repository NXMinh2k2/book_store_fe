import Link from "next/link";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please signup here
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Name</span>
            <input
              type="text"
              className="w-full mb-6 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="name"
              id="name"
            />
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full mb-6 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="password"
              id="password"
            />
          </div>
          <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
            Sign up
          </button>
          <div className="flex justify-between">
            <span>Already have account </span>
            <Link className="text-blue-500" href="/login">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
