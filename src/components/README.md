# Components

**Atomic Design**
Atomic design is atoms, molecules, organisms, templates, and pages concurrently working together to create effective interface design systems.

---

### Atoms

Atoms are our foundational building blocks that comprise all our user interfaces. These atoms include basic HTML elements like form labels, inputs, buttons, and others that can’t be broken down any further without ceasing to be functional.

### Molecules

Molecules are relatively simple groups of UI elements functioning together as a unit. For example, a form label, search input, and button can join together to create a search form molecule.

### Organisms

Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms. These organisms form distinct sections of an interface.

&nbsp;

---

**Common Functions**
A starting point of an api interface of some sort, these functions are commonly used in many of the components.

---

### constructor

Generates basic setup of elements that are permanent during component lifecycles.

### update

Updates component state values and runs update functions of child components.

### updapteDisplay

Updates and renders child components changes.

### rebuild

Updates dynamic elements list to prepare for render function.
Often used for dynamic lists or lazyloading of data.

### fireEvent

Dispatches a new event typically from the container element.

### render

Adds dynamic elements to the container element and renders updates of child components.

&nbsp;

---

**Event Functions**
Event callback functions, follow the same naming convention, unless multiple elements within a component use the same event type. In those cases, a more descriptive name will be used, to be able to differentiate between the callback handlers.

---

### handleOnClick

onClick callback

#### handleNextClick

onClick callback on next button.

#### handlePrevClick

onClick callback on prev button.

#### handleToggleClick

onClick callback on toggle button.

### handleOnChange

onChange callback

### handleOnFocus

onFocus callback

### handleOnBlur

onBlur callback

### handleOnLoad

onLoad callback

### handleOnError

onError callback

### handleOnInput

onInput callback

### handleKeyDown

onKeyDown callback

### handleOnSubmit

onSubmit callback

### handleOnScroll

onScroll callback

### handleOnObserve

onObserve callback
