# React LRUD

Official React bindings for [Lrud](https://github.com/bbc/lrud)

## Install

`npm install react-lrud`

All usage of `react-lrud` also relies on [Lrud](https://github.com/bbc/lrud)

`npm install lrud@2.7.1`

## Usage

Primary use of React LRUD is to wrap components via the `withNavigation` function,
and then wrapping those components in a `NavigationProvider`

```js
import { withNavigation } from 'react-lrud'
import { BaseButton } from 'third-party-library'

const Button = withNavigation(BaseButton);

export default Button;
```

In the above example, the `Button` will now be picked up inside an LRUD navigation tree when rendered inside
a `NavigationProvider` 

e.g

```js
import { withNavigation } from 'react-lrud'
import Lrud from 'lrud'
import { Button } from 'my-library' // the same button from the previous example

render() {
    const navigation = new Lrud();
    return <NavigationProvider navigation={navigation}>
        <Button>OK</Button>
        <Button>Cancel</Button>
    </NavigationProvider>
}
```

Now, `navigation.nodes` will contain entries for the 2 `Button`s.

# License


React LRUD is part of the BBC TAL libraries, and available to everyone under the terms of the Apache 2 open source licence (Apache-2.0). Take a look at the LICENSE file in the code.

Copyright (c) 2018 BBC
