import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User, X } from "lucide-react";
import { LogoRenderer } from "../components/util/ComponentsRenderer";
import { IsEmptyOrNull } from "../components/util/Common";

const ContactMe = ({ props }) => {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  return (
    props && (
      <>
        <div
          onClick={() => setOpen(true)}
          className="flex items-end gap-1 absolute top-2 right-4 z-10 backdrop-blur-xl p-2 mt-4 text-sm font-medium  text-white capitalize transition-colors duration-300 transform  rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          <User color="#03fce8" />
          Contact Me
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className=" relative transform overflow-hidden rounded-lg bg-blue-gray-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <X
                      onClick={() => setOpen(false)}
                      className="text-primary absolute right-5 top-5 cursor-pointer"
                    />
                    <div className="bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-1 text-center sm:ml-0 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h2"
                            className="font-semibold text-2xl md:text-3xl text-blue-400"
                          >
                            Contact Me
                          </Dialog.Title>
                          <section className="bg-gray-900">
                            <div className="container px-1 py-1 mx-auto ">
                              <div
                                className={`grid gap-4 mt-5  ${
                                  props.Direct === null
                                    ? "grid-cols-1 lg:grid-cols-1 md:grid-cols-1"
                                    : "grid-cols-2 lg:grid-cols-2 md:grid-cols-2"
                                }`}
                              >
                                <div
                                  className={`grid  gap-4  ${
                                    props.Direct === null
                                      ? "grid-cols-2 lg:grid-cols-2 md:grid-cols-2"
                                      : "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                                  }`}
                                >
                                  {props.SocialPlatform.map((item, index) => {
                                    return (
                                      <div key={index}>
                                        {item.prefixLogo &&
                                          item.prefixLogo.map((pl, index) => {
                                            return (
                                              <a
                                                key={index}
                                                className="optional-action-target-wrapper display-flex"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={
                                                  IsEmptyOrNull(pl.logoUrl)
                                                    ? "#top"
                                                    : pl.logoUrl
                                                }
                                              >
                                                <span
                                                  key={index}
                                                  className="inline-block p-3 text-blue-500 rounded-full bg-gray-800 m-2"
                                                >
                                                  {pl.logoSrc !== null ? (
                                                    <img
                                                      key={`img_${index}`}
                                                      className="h-6"
                                                      alt="test"
                                                      src="/assets/Logo/Naukri.svg"
                                                    />
                                                  ) : (
                                                    LogoRenderer(pl)
                                                  )}
                                                </span>
                                              </a>
                                            );
                                          })}

                                        <h2 className="mt-0 text-base font-medium text-white">
                                          {item.text}
                                        </h2>
                                        <p className="mt-1 text-sm text-blue-400">
                                          {item.url}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                                {props.Direct && (
                                  <div className="p-4 py-6 rounded-lg md:p-2 bg-gray-800">
                                    <form>
                                      <div className="-mx-2 md:items-center md:flex">
                                        <div className="flex-1 px-2">
                                          <input
                                            type="text"
                                            placeholder="Name "
                                            className="block w-full px-5 py-2.5 mt-2 border  rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                          />
                                        </div>
                                      </div>

                                      <div className="mt-4">
                                        <input
                                          type="email"
                                          placeholder="Your Email address"
                                          className="block w-full px-5 py-2.5 mt-2 border  rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                      </div>

                                      <div className="w-full mt-4">
                                        <textarea
                                          className="block w-full px-5 py-2.5 mt-2 h-36 border  rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                          placeholder="Message"
                                        ></textarea>
                                      </div>

                                      <button
                                        disabled={
                                          props.Direct.length < 1 ? true : false
                                        }
                                        className={`w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform 
                                        ${
                                          props.Direct.length < 1
                                            ? "bg-gray-500 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-100"
                                            : "bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                                        }  focus:ring-opacity-50`}
                                      >
                                        Send message
                                      </button>
                                    </form>
                                  </div>
                                )}
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    )
  );
};

export default ContactMe;
