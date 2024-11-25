import React from "react";

jest.mock('@heroicons/react/24/solid', () => ({
	Bars3Icon: () => <div>Menu</div>,
	XMarkIcon: () => <div>Close</div>,
	MagnifyingGlassIcon: () => <div>Search</div>,
}));
