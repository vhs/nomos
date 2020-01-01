Stripe product metadata

Service Product
- **description**: `string` - description of the product which may be rendered on the UI for checkout
- **default**: `true|false|undefined=false` - whether or not this is the default product amongst product peers, there should only be one default amongst peers.
- **sort**: `int` - the sort position of this product amongst peers
- **membership**: `MembershipCode<string>` - the associated membership code, if applicable
- **code**: `string` - this product's code, referenced in business logic and other product metadata
- **requires**: `CommaList<string>` - a comma separated list of other product codes required for this product to be available
- **privileges**: `CommaList<string>` - a comma separated list of user privileges required for this product to be available
- **grants**: `CommaList<string>` - a comma separated list of user privileges that this product purchase or subscription will grant the user.

Pricing Plan
- **description**: `string` - description of the pricing plan rendered on the UI for checkout
- **default**: `true|false|undefined=false` - whther or not this is the default pricing plan for the associated product, there should only be one amongst peers
- **sort**: `int` - the sort position of this pricing plan amongst peers

Order Product
- **description**:
- 