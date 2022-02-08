import Login from '@components/Shared/LoginManager';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from '@store/AuthProvider';
import Link from 'next/link';
import React, { Fragment } from 'react';

function NextLink(props) {
  let { href, active, children, ...rest } = props;

  return (
    <Link href={href}>
      <a className={`${active && 'bg-blue-500'}`} {...rest}>
        {children}
      </a>
    </Link>
  );
}

const UserNav = () => {
  const { session, loading, logout } = useSession();

  const PreAuthRenderUI = () => <Login />;

  const PostAuthRenderUI = () => {
    return (
      <div className="relative inline-block">
        <Menu>
          <Menu.Button className="text-gray-700 text-sm py-1.5 ml-2 rounded-lg hover:text-red-500">
            {session?.user?.name} <ChevronDownIcon className="inline w-4 h-4" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-6 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <NextLink
                      href="https://www.spacejoy.com/dashboard"
                      className={`${
                        active ? 'bg-gray-50 text-gray-500' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      active
                      target="_blank"
                    >
                      My Design Orders
                    </NextLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NextLink
                      href="https://www.spacejoy.com/orders"
                      className={`${
                        active ? 'bg-gray-50 text-gray-500' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      active
                      target="_blank"
                    >
                      My Product Orders
                    </NextLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NextLink
                      href="https://www.spacejoy.com/referrals"
                      className={`${
                        active ? 'bg-gray-50 text-gray-500' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      active
                      target="_blank"
                    >
                      My Referrals
                    </NextLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NextLink
                      href="https://www.spacejoy.com/profile"
                      className={`${
                        active ? 'bg-gray-50 text-gray-500' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      active
                      target="_blank"
                    >
                      My Profile
                    </NextLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NextLink
                      href="https://www.spacejoy.com/balance-check"
                      className={`${
                        active ? 'bg-gray-50 text-gray-500' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      active
                      target="_blank"
                      
                    >
                      Check Card Balance
                    </NextLink>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
                  {({ active }) => (
                    <NextLink
                      href="/help"
                      className={`${
                        active ? 'bg-gray-50 text-gray-500' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      active
                    >
                      Help
                    </NextLink>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? 'bg-gray-50 text-gray-500' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
              {/* <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <UsersIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      ) : (
                        <UserRemoveIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      )}
                      Archive
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <ShareIcon className="w-5 h-5 mr-2 text-violet-400" aria-hidden="true" />
                      ) : (
                        <ShareIcon className="w-5 h-5 mr-2 text-violet-400" aria-hidden="true" />
                      )}
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div> */}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  return session?.user?.name ? PostAuthRenderUI() : PreAuthRenderUI();
};

export default UserNav;
