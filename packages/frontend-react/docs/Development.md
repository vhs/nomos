# Development

## Components

This project uses a variant of the "Atomic React" pattern to organize its components. In short, Atomic React breaks up components into different types(/folders) based on re-use and complexity.<br />
I.e. an _atom_ is a component of bare function where as a molecule in increasingly complex, and so on.

This project divides components based on complexity and the inclusion of other components and their respective complexity levels.<br />
I.e. a simple component that includes an _Atom_ or other components will always at least be a Molecule.

This project uses the following levels to achieve this:

- _Atoms_ are re-usable, simple one-off components
- _Molecules_ are fundamental building blocks
- _Particles_ offer more functionality
- _Composites_ are re-usable (template) components
- _Materials_ are fully re-usable complex modules/components

Notes:

- A good way to look at classification is that Atoms may only use plain HTML (and not include other components), and every layer beyond an Atom is determined by the highest layer included. E.g. a Molecule component will always include at least one (1) Atom or external component, and a Particle component will at least include one (1) Molecule component.
- External components always count as Atoms.
- If a component has integrated sub-components, count this as one complexity layer and count from there. E.g. if a sub-component includes a Molecule, then the main component will be a Composite level component. (Molecule->Particle->Composite). See the Menu component as an example.

In addition to the "basic" components above, this project separates the following types of components:

- _Layouts_
- _Integrated Pages_ (i.e. one-size fits all pages that will adapt based on props passed - e.g. from routes)
- _Pages_
    - _Admin_
    - _Common_
    - _User_
- _App_
- _Providers_
- _Templates_

Furthermore, all components use a numbered naming convention to enforce consistent directory ordering:

- `src/components/00-components`
- `src/components/01-atoms`
- `src/components/02-molecules`
- `src/components/03-particles`
- `src/components/04-composites`
- `src/components/05-materials`
- `src/components/06-layouts`
- `src/components/07-pages`
- `src/components/08-app`
- `src/components/09-providers`
- `src/components/99-templates`

Barring templates, every type of component can be scaffolded by using the `pnpm create:_type_` command. <br />
E.g. `pnpm create:atom Logo` will create a template component by the name of `Logo` in `src/components/01-atoms/Logo`.

The basic page/route workflow consists of a `route` file (that extends a particular `layout`) which calls a `page` that includes all the relevant components.

## Source Code Organization

The sources are organized in the following folders:

- `src/components` is where all components live
- `src/lib` is where all other non-component code lives
- `src/routes` is where all routing files are kept
- `src/types` is where all supportive Typescript typing files reside

Additionally, the following files are relevant:

- `index.html` is the primary entry point for the application
- `src/main.tsx` is the primary JSX entrypoint
- `src/main.css` is the main CSS definitions file
- `src/router.tsx` provides routing scaffolding
