diff --git a/modules/activiti-form-engine/src/main/java/org/activiti/form/engine/impl/cmd/GetRuntimeFormDefinitionCmd.java b/modules/activiti-form-engine/src/main/java/org/activiti/form/engine/impl/cmd/GetRuntimeFormDefinitionCmd.java
index a71cd4c..93a8693 100644
--- a/modules/activiti-form-engine/src/main/java/org/activiti/form/engine/impl/cmd/GetRuntimeFormDefinitionCmd.java
+++ b/modules/activiti-form-engine/src/main/java/org/activiti/form/engine/impl/cmd/GetRuntimeFormDefinitionCmd.java
@@ -181,7 +181,7 @@
       for (SubmittedForm otherForm : submittedForms) {
         try {
           JsonNode submittedNode = formEngineConfiguration.getObjectMapper().readTree(otherForm.getFormValueBytes());
-          if (submittedNode == null || submittedNode.get("values") != null) {
+          if (submittedNode == null || submittedNode.get("values") == null) {
             continue;
           }
          
@@ -221,7 +221,7 @@
         try {
           if (StringUtils.isNotEmpty(fieldValue)) {
             LocalDate dateValue = LocalDate.parse(fieldValue);
-            variables.put(field.getId(), dateValue);
+            variables.put(field.getId(), dateValue.toString("yyyy-M-d"));
           }
         } catch (Exception e) {
           logger.error("Error parsing form date value for process instance " + processInstanceId + " with value " + fieldValue, e);
