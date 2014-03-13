

<div class="panel panel-primary">
	<div class="panel-heading"><%=product_name%>-<%=category%></div>
	<div class="panel-body row">

		<div class="col-md-6 inLine" id="mycolumn">
			<img class="logo"></img>
			<label class="prodName"><%=product_name%></label>

			<div class="priceManager">
				<label class="myprice">Price:</label><%=price%><br>
				<label class="mymanager">Acct.Manager:</label><%=acct_manager%>
			</div>	


		</div>	
		<div class="col-md-3 inLine" id="mycolumn2">
			<span class="label label-default" id="roleclass">Roles</span>
			<label class="rolelist"><%=roles%></label>
		</div>

		<div class="col-md-3 inLine" id="mycolumn3">
			<span class="label label-default" id="skillclass">Skills</span>
			<label class="skilllist"><%=skills%></label>

		</div>	
	</div>

	<div class="panel-footer"><b>Clients: </b><%=clients%></div>



</div>
		<!-- </td>

	</tr>
</table>
 -->