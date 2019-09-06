# fastmapper

[![Build Status](https://travis-ci.org/valantonini/fastmapper.svg?branch=master)](https://travis-ci.org/valantonini/fastmapper)

A no config, lightweight JS object mapper to map api responses to local viewmodels with comprehensive test coverage.


Given we have a source type we want to decouple to a type under our control
```javascript
class ChildSource {
    prop = "";
}
```

And we have a destination type
```javascript
class ChildDestination {
    prop = ""; // same name an type, mapped by convention
    
    getIcon() {
        // class specific function that makes sense for this but not the source or maybe we can't change the source class
    }
}
```

We can map by convention and convert types
```javascript
// a placeholder destination
const destination = {
    prop: undefined,
    collection: undefined,
};

new FastMapper()
    .withConversion(ChildSource, ChildDestination) //make child sources into child destinations with it's functions
    .map(source, destination);
```

Saving having to do

```javascript
const prop = new ChildDestination();
prop.prop = "source1";

const firstElement = new ChildDestination();
firstElement.prop = "source2";

const secondElement = new ChildDestination();
secondElement.prop = "source3"

const collection = [firstElement, secondElement];

const destination = {
    prop: prop,
    collection: collection
}
```