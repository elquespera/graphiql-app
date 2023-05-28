import { Disclosure } from '@headlessui/react';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

interface AccordionProps {
  title?: string | React.ReactNode;
  children?: string | React.ReactNode;
  className?: string;
  titleClass?: string;
}

export default function Accordion({ title, children, className, titleClass }: AccordionProps) {
  return title && children ? (
    <Disclosure>
      {({ open }) => (
        <div className={className}>
          <Disclosure.Button className="relative flex items-center gap-2">
            <div className="absolute -left-[1.2em] text-slate-400">
              {open ? (
                <MinusCircleIcon className="w-[1em] h-[1em]" />
              ) : (
                <PlusCircleIcon className="w-[1em] h-[1em]" />
              )}
            </div>
            <span className={titleClass}>{title}</span>
          </Disclosure.Button>
          <Disclosure.Panel className="mt-2 mb-4 ml-2 flex flex-col gap-2">
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  ) : null;
}
