import { HookCallbacks } from "async_hooks";

type Props = {
    setTotalHexes: Function,
  }

export default function ClearHexes ({setTotalHexes}: Props) {

    function clearHexes() {
        setTotalHexes(() => []);
        localStorage.clear();
    }

    return (
    <button
        className="flex mx-7 my-2 p-2 bg-red-400 text-white text-xs rounded-xl outline-none font-semibold"
        onClick={() => clearHexes()}
        >
            Clear
    </button>
    )
}