/**
 * Conditionally wraps the given children with a provided wrapper component.
 * If the condition is true, the children are wrapped with the given wrapper component.
 * If the condition is false, the children are returned as they are.
 *
 * @param {object} props - The properties passed to the ConditionalWrapper component.
 * @param {boolean} props.condition - Determines whether the children should be wrapped.
 * @param {function} props.wrapper - The wrapper component that will wrap the children if the condition is true. It takes the children as its argument and returns the wrapped children.
 * @param {React.ReactNode} props.children - The children that are to be conditionally wrapped.
 * @returns {React.ReactNode} - The wrapped children if the condition is true, otherwise the original children.
 */
const ConditionalWrapper = ({ condition, wrapper, children }) => condition ? wrapper(children) : children;

export { ConditionalWrapper };