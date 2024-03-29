export default function FormExtra({ handleForgotPassword }: { handleForgotPassword: () => void }) {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
          Nhớ mật khẩu
        </label>
      </div>

      <div className="text-sm">
        <button type="button" onClick={() => handleForgotPassword()} className="font-medium text-rose-600 hover:text-rose-500">
          Quên mật khẩu?
        </button>
      </div>
    </div>

  )
}