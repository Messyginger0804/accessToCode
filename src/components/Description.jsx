import { links } from '../utils/links';

function Description() {
    const p = `I've been fortunate enough to have support and resources on my coding journey, but I know that's not the case for everyone. While I may not have the means to donate money to organizations, I believe in the power of community and giving what I can. That's why I'm offering used computers, donated by individuals in the IT industry, to aspiring coders who need them.`

    const x = ` Welcome to my coding journey! As an individual passionate about coding and the developer community, I've embarked on a mission to give back. I understand that not everyone has access to the necessary tools to pursue their coding dreams, and I want to change that.`

    const y = `Let's make coding accessible to everyone. Join me on this journey by signing up for a chance to receive a computer and kickstart your coding dreams.`
    return (
        <div className="flex flex-col p-6 items-start md:flex-row w-full m-auto md:w-[50%]">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Join My Coding Journey: Giving Back to Developers in Need</h2>
                <p className="text-lg mb-4">
                    {x}
                </p>
                <p className="text-lg mb-4">
                    {p}
                </p>
                <p className="text-lg mb-4">
                    <strong>How It Works:</strong>
                    <ol className="list-decimal ml-8">
                        <li>Sign Up: Fill out the form to enter the giveaway.</li>
                        <li>Random Selection: A lucky recipient will be chosen at random.</li>
                        <li>Empowerment: The chosen individual will receive a computer, ready to support their coding journey. Please note that the computers provided may vary in model and brand, as they are obtained through donations from my connections in IT.</li>
                        <li className="font-bold">
                            I must be connected with you on <a className="underline text-blue-500" href={links.linkedin}>LinkedIn</a> to win.
                        </li>
                    </ol>
                </p>
                <p className="text-lg">
                    {y}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    <strong>Disclaimer:</strong> Please note that while the computers are provided free of charge, recipients are responsible for covering shipping costs.
                </p>
            </div>
        </div>
    );
}

export default Description;
