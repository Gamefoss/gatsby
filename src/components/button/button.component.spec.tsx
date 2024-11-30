import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '@components';



describe('Button Component', () => {
	it('renders correctly with default props', () => {
		const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);
		expect(getByText('Click me')).toBeInTheDocument();
	});
	
	it('calls onClick handler when clicked', () => {
		const onClickMock = jest.fn();
		const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
		fireEvent.click(getByText('Click me'));
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});
	
	it('applies the primary variant class by default', () => {
		const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);
		expect(getByText('Click me')).toHaveClass('btn--primary');
	});
	
	it('applies the secondary variant class when specified', () => {
		const { getByText } = render(<Button onClick={() => {}} variant="secondary">Click me</Button>);
		expect(getByText('Click me')).toHaveClass('btn--secondary');
	});
	
	it('applies additional class names when specified', () => {
		const { getByText } = render(<Button onClick={() => {}} className="extra-class">Click me</Button>);
		expect(getByText('Click me')).toHaveClass('extra-class');
	});
	
	it('renders children correctly', () => {
		const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);
		expect(getByText('Click me')).toBeInTheDocument();
	});
	
	it('handles custom variant class names', () => {
		const { getByText } = render(<Button onClick={() => {}} variant="custom-variant">Click me</Button>);
		expect(getByText('Click me')).toHaveClass('btn--custom-variant');
	});
});
