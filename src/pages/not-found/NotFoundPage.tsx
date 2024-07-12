import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
            <div className="w-9/12 max-w-xl p-8 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-red-600">404</h1>
                    <p className="my-4 text-xl text-gray-600 dark:text-slate-300">Page Not Found</p>
                    <button onClick={() => navigate(-1)} className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        <span aria-hidden="true">&rarr;</span> بازگشت به صفحه قبل
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
