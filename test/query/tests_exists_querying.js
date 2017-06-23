var Grove = artifacts.require("./Grove.sol"),
GroveLib = artifacts.require("./GroveLib.sol"),
web3,contrct,contrct_address,deploy_coinbase,
tree_nodes = {
    'a': 18,
    'b': 0,
    'c': 7,
    'd': 11,
    'e': 16,
    'f': 3,
    'g': 16,
    'h': 17,
    'i': 17,
    'j': 18,
    'k': 12,
    'l': 3,
    'm': 4,
    'n': 6,
    'o': 11,
    'p': 5,
    'q': 12,
    'r': 1,
    's': 1,
    't': 16,
    'u': 14,
    'v': 3,
    'w': 7,
    'x': 13,
    'y': 6,
    'z': 17,
}

contract('Grove', function(accounts) {
  deploy_coinbase = accounts[0];


  it("should deploy Grove Contract", function() {
    var grove = Grove.deployed();
    return grove.then(function(instance) {
      contrct = instance;
      web3 = instance.constructor.web3
      web3.utils = web3._extend.utils;
      contrct_address = instance.address;

      assert.notEqual(contrct.address, null, "Grove not deployed!!");
      console.log("Grove deployed at "+contrct_address)
    });
  })

  it("Should create a new index",function(done){
    return contrct.computeIndexId.call(deploy_coinbase, "test-a")
    .then(function(a){
      index_id =a;
      var i = [],final;

      Object.keys(tree_nodes).forEach(function(tr){
        var sc;
        return sc = contrct.exists.call(index_id,tr)
        .then(function(e1){
          assert.equal(e1,false,"Node e1 exists in Index before insertion");
        })
        .then(function(){
          i[tr] = contrct.insert("test-a",tr,tree_nodes[tr])
          .then(function(a){
            contrct.exists.call(index_id,tr)
            .then(function(e2){
              console.log(e2,tr,a)
              assert.equal(e2,true,"Node e2 does not exist in Index after insertion");
            })
          });
        })
        if(tr == "z")crossCheck();
      });

    function crossCheck(){
        // Make sure it still registers as having all of the nodes.
        Object.keys(tree_nodes).forEach(function(tr){
          var sc = i[tr].then(function(){
            contrct.exists.call(index_id,tr)
            .then(function(e3){
              console.log(e3,tr)
              assert.equal(e3,true,"Node e3 does not exist in Index after insertion");
            });
          });
          if(tr == "z")sanityCheck();
        });
    }

    function sanityCheck(){
        // Sanity check
        ['aa', 'tsra', 'arst', 'bb', 'cc'].forEach(function(s){
          (function(n){
          contrct.exists.call(index_id,s)
          .then(function(e4){
            assert.equal(e4,false,"Node e4 exists without insertion");
            if(n=='cc')done;
          });
        })(s);
          });
      }

        });
    });

  /*
    def test_exists_query_special_case(deploy_coinbase, deployed_contracts):
        grove = deployed_contracts.Grove
        index_id = grove.computeIndexId(deploy_coinbase, "test-b")

        grove.insert('test-b', 'key', 1234)

        assert grove.exists(index_id, '') is False
      });
      */

    });
