function Welcome({ name }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome, {name}!</h1>
            <p className="text-lg text-gray-600">
                Please log in to manage your projects effectively.
            </p>
        </div>
    );
}

export default Welcome;
