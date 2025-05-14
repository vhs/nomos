# Development

## Source Code Organization

The sources are organized in the following manner:

- `src/components` is where all components live
- `src/lib` is where all other non-component code lives
- `src/routes` is where all routing files are kept
- `src/stories` is where all common Storybook files are kept
- `src/styles` is where all common styles files are kept
- `src/types` is where all supportive Typescript typing files reside

Additionally, the following files are relevant:

- `index.html` is the primary entry point for the application
- `src/main.tsx` is the primary JSX entrypoint
- `src/main.css` is the main CSS definitions file
- `src/router.tsx` provides routing scaffolding

## Components

### Primary Components

This project uses a variant of the "Atomic React" pattern to organize its components. In short, Atomic React breaks up components into different types(/folders) based on re-use and complexity.<br />
I.e. an _atom_ is a component of bare function where as a molecule in increasingly complex, and so on.

This project divides components based on complexity and the inclusion of other components and their respective complexity levels.<br />
I.e. a simple component that imports another component or external components will always at least be a Molecule.

This project uses the following levels to achieve this:

- _Atoms_ are re-usable, simple HTML components
- _Molecules_ are fundamental building blocks that import at least either an Atom or an external component
- _Particles_ offer more functionality (and import Molecule components)
- _Composites_ are re-usable (template) components (and import Particle components)
- _Materials_ are fully re-usable complex modules/components (and import Composite components)

**Notes**:

> - A good way to look at classification is that Atoms may only use plain HTML (and not import other components), and every layer beyond an Atom is determined by the highest layer imported. E.g. a Molecule component will always import at least one (1) Atom or external component, and a Particle component will at least import one (1) Molecule component.
> - External components always count as Atoms.
> - If a component has integrated sub-components, count this as one complexity layer and count from there.<br />E.g. if a sub-component imports a Molecule, then the main component will be a Composite level component.<br />(Molecule->Particle->Composite). See the Menu component as an example.
> - Every type of component can be scaffolded by using the `pnpm create:_type_` command.<br />
>   E.g. `pnpm create:atom Logo` will create a template component by the name of `Logo` in `src/components/01-atoms/Logo`.

### Secondary Components

In addition to the "basic" components above, this project separates the following types of components:

- _Layouts_ for general layout components.
- _Integrated Pages_ for common components that will adapt based on props passed. (E.g. pages in this directory can be call from an admin route with an admin prop to show the admin page instead of the user page.)
- _Pages_ divided in logical groupings.
    - _Admin_ for admin page components.
    - _Common_ for non-authenticated page components.
    - _User_ for user page components.
- _App_ for app components.
- _Providers_ for React Content Provider components.
- _Templates_ for `generate-react-cli` template components.

### Folder Structure

Furthermore, all components use a numbered naming convention to enforce consistent directory ordering:

- `src/components/00-components`
- `src/components/01-atoms`
- `src/components/02-molecules`
- `src/components/03-particles`
- `src/components/04-composites`
- `src/components/05-materials`
- `src/components/06-layouts`
- `src/components/07-integrated-pages`
- `src/components/07-pages`
- `src/components/08-app`
- `src/components/09-providers`
- `src/components/99-templates`

**Note**:

> While new components may be created as a `component` and moved to the appropriate directory later, but components should never be committed to the `00-components` directory.

## Routing

The basic page/route workflow consists of a `route` file (that extends a particular `layout`) which calls a `page` that imports all the relevant components.
