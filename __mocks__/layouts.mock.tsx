import React from "react";

jest.mock('@layouts', () => ({
	BaseLayout: ({children}: {children: React.ReactNode}) => <div>{children}</div>
}));
