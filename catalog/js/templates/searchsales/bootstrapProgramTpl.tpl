

<div class="panel panel-primary">
	<div class="panel-heading"><%=program_name%>-<%=category%></div>
	<div class="panel-body row">

		<div class="col-md-6 inLine" id="mycolumn">
			<img class="logo"></img>
			<label class="prodName"><%=program_name%></label>

			<div class="priceManager">
				<label class="myprice">Price:</label><%=price%><br>
				<label class="mymanager">Acct.Manager:</label><%=acct_manager%>
			</div>	


		</div>	
		<div class="col-md-2 inLine" id="mycolumn2">
			<span class="label label-default" id="prodClassProgram">Products</span>
			<label class="prodListProgram"><%=products%></label>
		</div>

		<div class="col-md-2 inLine" id="mycolumn3">
			<span class="label label-default" id="roleClassProgram">Roles</span>
			<label class="roleListProgram"><%=roles%></label>

		</div>	

		<div class="col-md-2 inLine" id="mycolumn4">
			<div id="skillClassProgram">
				<span class="label label-default">Skills</span>
			</div>
			<div class="skillListProgram"><label><%=skills%></label></div>

		</div>
	</div>

	<div class="panel-footer"><b>Clients: </b> <%=clients%></div>



</div>
		<!-- </td>

	</tr>
</table>
 -->