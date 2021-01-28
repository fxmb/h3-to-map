import { Switch } from "@headlessui/react";

export default function SwitchToggle({switchValue, setSwitchValue})  {
    return (
    
    <Switch.Group as="div" className="flex items-center space-x-8">
        <Switch
        as="button"
        checked={switchValue}
        onChange={setSwitchValue}
        className={"bg-gray-300 relative inline-flex flex-shrink-0 h-6 transition-colors duration-400 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline"}
        >
        {({ checked }) => (
            <span
            className={`${
                checked ? "translate-x-5" : "translate-x-0"
            } inline-block w-5 h-5 transition duration-500 ease-in-out transform bg-blue-500  rounded-full`}
            />
        )}
        </Switch>
    </Switch.Group>)

    }