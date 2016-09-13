import { add } from '../../{{ dashCase name }}';

describe( 'A suite is just a function', function(): void {
  it( 'and so is a spec', function(): void {
    expect( add( 1, 2 ) ).toBe( 3 );
  } );
} );
