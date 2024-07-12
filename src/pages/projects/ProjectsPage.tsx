
import { useState } from "react";

function ProjectsPage() {
    const [count, setCount] = useState(0);
    // const { auth } = useAuth();k

    function handleAlertClick() {
        setTimeout(() => {
            alert("You clicked on: " + count);
        }, 1000);
    }
    // console.log({auth})
    return (
        <>
            <div className="w-full h-full border">
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
        /*/-*
                <button onClick={handleAlertClick}>Show alert</button>
                {/* <pre>{JSON.stringify({ auth }, null, 2)}</pre> */}

            </div>
        </>
    );
}

export default ProjectsPage;