import { render, screen } from '@testing-library/react';
import { ConditionalWrapper } from './ConditionalWrapper';
import { describe, it, expect } from 'vitest';

describe('ConditionalWrapper', () => {
  it('renders children within a wrapper when condition is true', () => {
    render(
      <ConditionalWrapper
        condition={true}
        wrapper={(children) => <div data-testid="wrapper">{children}</div>}
      >
        <div>test</div>
      </ConditionalWrapper>
    );
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toBeDefined();
    expect(wrapper.textContent).to.have.string('test');
  });

  it('renders children directly without a wrapper when condition is false', () => {
    const { container } = render(
      <ConditionalWrapper
        condition={false}
        wrapper={(children) => <div data-testid="wrapper">{children}</div>}
      >
        <div>test</div>
      </ConditionalWrapper>
    );
    const wrapper = container.querySelector('[data-testid="wrapper"]');
    expect(wrapper).toBeNull();
    expect(screen.getByText('test')).toBeDefined();
  });
});