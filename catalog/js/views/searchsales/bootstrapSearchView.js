/**
 *
 * @author Dhiraj Bodicherla <dhiraj.bodicherla@knolskape.com>
 *
 * @version $Id$
 * @copyright KNOLSKAPE Solutions PVT LTD
 * @since 28 July, 2012
 * @package default
 **/

/**
 * File description
 **/


 define([
   'jquery',
   'underscore',
   'backbone',
   'text!js/templates/searchsales/bootstrapSearchTpl.tpl',
   'js/collections/searchsales/prodCollection',
   'js/models/searchsales/bootstrapProductModel',
   'js/views/searchsales/bootstrapProductView',
   'bootstrap.check',
   'js/models/searchsales/bootstrapProgramModel',
   'js/views/searchsales/bootstrapProgramView'





   ], function ($, _, Backbone, bootSearchTemplate,prodCollection,bootstrapProductModel,bootstrapProductView,bc,bootstrapProgramModel,bootstrapProgramView) {

       var bootstrapSearchView = Backbone.View.extend({

          id: 'bootSearch_view',
          className: 'bootSearch__view',
          template: _.template(bootSearchTemplate),



          initialize: function () {
             _.bindAll(this, 'render');
             window.EventBus = _.extend({}, Backbone.Events);
            //window.EventBus2 = _.extend({}, Backbone.Events);


        },

        
        render: function () {

        	this.$el.html(this.template());
        	return this;        

        },

        

        events:{


         "click #searchit":"fetc",
         "keypress #searchtext" : "fetchByKey",
         "click #simuls":"fetchThis",
         "click #anims":"fetchThis",
         "click #elearns":"fetchThis",
         "click #cases":"fetchThis",
         "click #ilts":"fetchThis",
         "click #program":"fetchThis"

     },

     formUrl:function(){
         
        var url=$("#searchtext").val();
        var toSearch=$("#basisselect").val();

        switch(toSearch){

            case "Roles":
            var toFetchUrl='api/ext/laravel/rahul_php/public/index.php/searchOnRoles?role_name='+url;
            break;
            case "Skills": 
            var toFetchUrl='api/ext/laravel/rahul_php/public/index.php/searchOnSkills?skill_name='+url;
            console.log(toFetchUrl);
            break;
            case "Tags":
            var toFetchUrl='api/ext/laravel/rahul_php/public/index.php/searchOnTags?tag_name='+url;
            break;
            case "Category":
            var toFetchUrl='api/ext/laravel/rahul_php/public/index.php/searchOnCategory?category='+url;
            break;
            case "Clients":
            var toFetchUrl='api/ext/laravel/rahul_php/public/index.php/searchOnClients?client_name='+url;
            break;
            case "Anything":
            var toFetchUrl='api/ext/laravel/rahul_php/public/index.php/search?search_param='+url;
            break;



            

        }

         return toFetchUrl;



     },

     renderPrograms:function(progs,typeCounter){

       var noOfProgs=Object.keys(progs.attributes).length;

                      for(var i=0;i<noOfProgs;i++){

                       var progModel=new bootstrapProgramModel();
                       progModel.set({price:progs.attributes[i].price});
                       progModel.set({acct_manager:progs.attributes[i].acct_manager});
                       progModel.set({program_name:progs.attributes[i].program_name});
                       progModel.set({category:"Program"});
                       typeCounter["Programs"]+=1;


                       var progRolesArray=progs.attributes[i].roles.split(",");
                       var progRolesArrayJoin=progRolesArray.join("<br>");

                       var progSkillsArray=progs.attributes[i].skills.split(",");
                       var progSkillsArrayJoin=progSkillsArray.join("<br>");

                       var progClientss=progs.attributes[i].clients;

                       var prodsArray=progs.attributes[i].products.split(",");
                       var prodsArrayJoin=prodsArray.join("<br>");

                       progModel.set({roles:progRolesArrayJoin});
                       progModel.set({skills:progSkillsArrayJoin});
                       progModel.set({clients:progClientss});
                       progModel.set({products:prodsArrayJoin});


                       var progView=new bootstrapProgramView({model:progModel});
                       $('body').append(progView.render().el);

                   }


     },


     adjustPosition:function(){

            $( "body").find("#bootproduct_view:first").find(".panel").css( "margin-top", "-16%" );
            $("body").find("#bootproduct_view").find("#mycolumn3").css("border-right","none");
            $('input[type="checkbox"]').checkbox();

            if($("#bootSearch_view").next().attr("id")=="bootprogram_view")
                $( "body").find("#bootprogram_view:first").find(".panel").css( "margin-top", "-16%" );

     },

     setBadge:function(typeCounter){

       $("#sim-badge").text(typeCounter["Simulations"]);
       $("#anim-badge").text(typeCounter["Animations"]);
       $("#case-badge").text(typeCounter["Case-studies"]);
       $("#e-badge").text(typeCounter["E-learning"]);
       $("#ilt-badge").text(typeCounter["ILT"]);


     },

     renderProducts:function(a,newCheckedArray,typeCounter){

        var noOfObjects=Object.keys(a.attributes).length;

                        for(var i=0;i<noOfObjects;i++){
                           var category=a.attributes[i].category;


                           if(newCheckedArray["simuls"]==category || newCheckedArray["anims"]==category|| newCheckedArray["elearns"]==category|| newCheckedArray["cases"]==category|| newCheckedArray["ilts"]==category ){

                            var prodModel=new bootstrapProductModel();
                            prodModel.set({price:a.attributes[i].price});
                            prodModel.set({acct_manager:a.attributes[i].acct_manager});
                            prodModel.set({product_name:a.attributes[i].product_name});
                            prodModel.set({category:category.substr(0,category.length-1)});
                            typeCounter[category]+=1;


                            var rolesArray=a.attributes[i].roles.split(",");
                            var rolesArrayJoin=rolesArray.join("<br>");

                            var skillsArray=a.attributes[i].skills.split(",");
                            var skillsArrayJoin=skillsArray.join("<br>");

                            var clientss=a.attributes[i].clients;



                            prodModel.set({roles:rolesArrayJoin});
                            prodModel.set({skills:skillsArrayJoin});
                            prodModel.set({clients:clientss});


                            var view=new bootstrapProductView({model:prodModel});
                            $('body').append(view.render().el);

                        }


                    }



     },

     seeCheckedItem:function(){

      var checkedItem={ "simuls":"nocheck",
                            "anims":"nocheck",
                            "elearns":"nocheck",
                            "ilts":"nocheck",
                            "cases":"nocheck",
                            "programs":"nocheck"
                      };


                        if($("#simuls").prop("checked"))
                            checkedItem["simuls"]=$("#simuls").attr("name");
                        
                        if($("#anims").prop("checked"))
                            checkedItem["anims"]=$("#anims").attr("name");
                        
                        if($("#elearns").prop("checked"))
                            checkedItem["elearns"]=$("#elearns").attr("name");
                        
                        if($("#cases").prop("checked"))
                             checkedItem["cases"]=$("#cases").attr("name");
                       
                        if($("#ilts").prop("checked"))
                            checkedItem["ilts"]=$("#ilts").attr("name");
                      
                        if($("#program").prop("checked"))
                          checkedItem["programs"]=$("#program").attr("name");

                        return checkedItem;
                       

     },

     nothingChecked:function(checkedArray){

      var no="nocheck";
      if(checkedArray["simuls"]==no && checkedArray["anims"]==no && checkedArray["elearns"]==no && checkedArray["cases"]==no && checkedArray["ilts"]==no && checkedArray["programs"]==no){
                         
                         checkedArray["simuls"]=$("#simuls").attr("name");
                         checkedArray["anims"]=$("#anims").attr("name");
                         checkedArray["elearns"]=$("#elearns").attr("name");
                         checkedArray["cases"]=$("#cases").attr("name");
                         checkedArray["ilts"]=$("#ilts").attr("name");
                         checkedArray["programs"]=$("#program").attr("name");



      }
       
       return checkedArray;

     },

     


     callProdPrograms:function(){

        var that=this;

        var prodCollect=new prodCollection();
        var toFetchUrl=this.formUrl();

        prodCollect.url=toFetchUrl;

        prodCollect.fetch({

            success: function(collection){
                console.log(prodCollect.models.length); 
                
                    // console.log(typeof ($("#simuls").attr("checked"));
                        var checkedArray=that.seeCheckedItem();
                        var newCheckedArray=that.nothingChecked(checkedArray);

                      
                        var typeCounter={ "Simulations":0,
                                          "Animations":0,
                                          "E-learning":0,
                                          "Case-studies":0,
                                          "ILT":0,
                                          "Programs":0 };

                        var a =prodCollect.models[1];                  
                        that.renderProducts(a,newCheckedArray,typeCounter);


                   if(newCheckedArray["programs"]!="nocheck"){

                      var progs =prodCollect.models[0];
                      that.renderPrograms(progs,typeCounter);
                     

               }



               that.adjustPosition();

               


               // if(programs!="nocheck" && (simuls=="nocheck" && anims=="nocheck" && elearns=="nocheck" && cases=="nocheck" && ilts=="nocheck" ))
                    // $( "body").find("#bootprogram_view:first").find(".panel").css( "margin-top", "-16%" );
              
              that.setBadge(typeCounter);
              
               //$("#prog-badge").text(typeCounter["Programs"]);

           }




       });




},





fetchThis:function(e){



  $(".bootproduct__view").remove();
  $(".bootprogram__view").remove();

  //$(".bootproduct__view").slideUp('slow', function(){ $(".bootproduct__view").remove(); });
  //$(".bootprogram__view").slideUp('slow', function(){ $(".bootprogram__view").remove(); });


  console.log("yes");


  var url=$("#searchtext").val();
  if(url){

    var toFetchUrl=this.formUrl();

    var prodCollect=new prodCollection();
    prodCollect.url=toFetchUrl;
    that=this;

    prodCollect.fetch({

        success: function(collection){
            console.log(prodCollect.models.length); 
            
                    // console.log(typeof ($("#simuls").attr("checked"));

                      var checkedArray=that.seeCheckedItem();
                                         


                        //var noOfObjects=Object.keys(a.attributes).length;
                        var typeCounter={"Simulations":0,"Animations":0,"E-learning":0,"Case-studies":0,"ILT":0,"Programs":0};
                        var a =prodCollect.models[1];
                        that.renderProducts(a,checkedArray,typeCounter);
 




                    

                

                     if(checkedArray["programs"]!="nocheck"){

                      var progs =prodCollect.models[0];
                      that.renderPrograms(progs,typeCounter);
                     

               }




                    that.adjustPosition();
                    //if(( "body").find("#bootproduct_view:first").find(".panel").length)
                    that.setBadge(typeCounter);
                 
                


                //if(programs!="nocheck" && (simuls=="nocheck" && anims=="nocheck" && elearns=="nocheck" && cases=="nocheck" && ilts=="nocheck" ))
                  //   $( "body").find("#bootprogram_view:first").find(".panel").css( "margin-top", "-16%" );


               
              }




          });






}



},



fetchByKey:function(e){

 if(e.which==13){
    alert("het");
    this.callProdPrograms();


}

},




fetc:function(e){

  alert("no");
  this.callProdPrograms();

}




});

return bootstrapSearchView;
});