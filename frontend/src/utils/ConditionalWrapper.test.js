import ConditionalWrapper from './ConditionalWrapper';

describe('ConditionalWrapper', () => {
  it('should render children when condition is false', () => {
    const wrapper = jest.fn();
    const children = <div>test</div>;
    const condition = false;

    const wrapperComponent = shallow(
      <ConditionalWrapper condition={condition} wrapper={wrapper}>
        {children}
      </ConditionalWrapper>
    );

    expect(wrapper).not.toHaveBeenCalled();
    expect(wrapperComponent).toMatchSnapshot();
  });

  it('should render wrapper when condition is true', () => {
    const wrapper = jest.fn();
    const children = <div>test</div>;
    const condition = true;

    const wrapperComponent = shallow(
      <ConditionalWrapper condition={condition} wrapper={wrapper}>
        {children}
      </ConditionalWrapper>
    );

    expect(wrapper).toHaveBeenCalledWith(children);
    expect(wrapperComponent).toMatchSnapshot();
  });
})