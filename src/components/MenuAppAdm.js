import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import logo from '../components/images/watermark.png';  // Certifique-se de que o caminho está correto

const navigation = [
    { name: 'Painel', href: '/lista', current: false },
    { name: 'Cadastre um novo perfil', href: '/app', current: false },
    { name: 'Novidades', href: '/novidades', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MenuAppAdm() {
    const location = useLocation();
    const [novidades, setNovidades] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const fetchNovidades = async () => {
            try {
                const db = getDatabase();
                const snapshot = await get(ref(db, 'novidades'));
                if (snapshot.exists()) {
                    const novidadesData = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
                    setNovidades(novidadesData);
                    setNotificationCount(novidadesData.length);
                }
            } catch (error) {
                console.error('Erro ao buscar novidades:', error);
            }
        };

        fetchNovidades();
    }, []);

    return (
        <Disclosure as="nav" className="bg-red-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden z-40">
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Abrir menu principal</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center z-30"> {/* Adicionado z-30 */}
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}  // Usando a imagem do logo importada
                                        alt="Sua Empresa"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => {
                                            const isCurrent = location.pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        isCurrent ? 'bg-red-700 text-white' : 'text-gray-300 hover:bg-red-600 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={isCurrent ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-20"> {/* Adicionado z-20 */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Ver notificações</span>
                                            <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            {notificationCount > 0 && (
                                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/3 -translate-y-1/3 bg-red-700 rounded-full">
                                                    {notificationCount}
                                                </span>
                                            )}
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {novidades.map((novidade) => (
                                                <Menu.Item key={novidade.id}>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/novidades"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            <span className="block font-semibold">{novidade.titulo}</span>
                                                            <span className="block text-sm">{novidade.mensagem}</span>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="absolute inset-y-0 right-16 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-10"> {/* Adicionado z-10 */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Abrir menu de usuário</span>
                                            <UserCircleIcon className="h-8 w-8 text-white" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/navpage"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sair
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
