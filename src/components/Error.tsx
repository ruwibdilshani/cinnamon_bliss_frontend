export function Error() {
    return (
        <>
            <div className="flex items-center justify-center h-[70vh] bg-green-50 animate-fade-in">
                <div
                    className="text-center bg-green-800 text-white p-12 rounded-xl shadow-lg w-full max-w-lg transform transition duration-500 ease-in-out scale-95 hover:scale-100">
                    <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
                    <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
                    <button
                        onClick={() => window.location.replace("/")}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-green-500">
                        Go Back Home
                    </button>
                </div>
            </div>
        </>
    );
}
