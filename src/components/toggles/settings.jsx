import { MdSettings } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";
import { useState, useContext, Fragment } from "react";
import { ColorContext } from "utils/contexts/color";

export default function SettingsMenu({ Settings }) {
  let [isOpen, setIsOpen] = useState(false);
  const { color: active } = useContext(ColorContext);

  let [config, setConfig] = useState(Settings);
  const save = (conf, path) => {
    fetch(`/api/config/update`, {
      method: "POST",
      body: JSON.stringify({ config: conf, file: path }),
    });
  };

  const handleConfigUpdate = (event) => {
    setConfig(event.target.value);
  };
  return (
    <div id="editor" className="rounded-full flex align-middle self-center mr-3">
      <MdSettings
        onClick={() => setIsOpen(true)}
        className="text-theme-800 dark:text-theme-200 w-5 h-5 cursor-pointer"
      />
      <Dialog transition open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50" unmount="false">
        <div className={`fixed flex-col flex mt-3 inset-0 w-screen items-center justify-center theme-${active} p-4`}>
          <textarea
            value={config}
            onChange={handleConfigUpdate}
            name="settingsEditor"
            className="rounded-md mb-2 shadow-lg ring-1 ring-black ring-opacity-5 w-full md:w-[75vw] h-full md:h-[75vh] xl:w-[60vw] xl:h-[60vh] bg-theme-900 text-theme-100"
          ></textarea>
          <button
            className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 w-full md:w-[75vw] xl:w-[60vw] bg-theme-700 text-theme-100 h-10"
            onClick={() => {
              console.log(config);
              save(config, "settings.yaml");
            }}
          >
            {" "}
            Save Settings{" "}
          </button>
        </div>
      </Dialog>
    </div>
  );
}
