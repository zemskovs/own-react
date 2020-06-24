function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createElement(child),
      ),
    },
  };
}

const TextElement = 'TEXT_ELEMENT';

function createTextElement(text) {
  return {
    type: TextElement,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === TextElement
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = (key) => key != 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

const Didact = {
  createElement,
  render,
};

const d = Didact.createElement;

/** @jsx Didact.createElement */
const element = d(
  'div',
  { id: 'Hey' },
  d('h1', {}, d(TextElement, {nodeValue: 'Hello'})),
);

const container = document.getElementById('root');
Didact.render(element, container);
