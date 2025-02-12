export function SignIn() {
    return (
        <>
        <div className="fles min-h-screen items-center justify-center p-5 ">
            <div className="flex bg-white overflow-hidden w-full max-w-4xl">
                <div className="w-1/2 p-6">
                    <h2 className="text-center mb-6" >SignIn</h2>
                    <form className="space-y-6">
                        <div>
                            <label >Email</label>
                            <input type="email" id="email" name="email" className={"w-full p-2 mt-1 "} placeholder="Email" />
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" id="password" name="password" className={"w-full p-2 mt-1 "} placeholder="Enter Password" />
                        </div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700">SignIn</button>
                    </form>
                    <p className="text-center mt-4">Create an Account <a href="">SignUp</a> </p>
                </div>
                <div className="w-1/2">
                    <img src={""} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
        </>
    );
}