SELECT t.TopicID
	,t.TopicName
	,rtype.ResourceTypeName
	,r.ResourceName
	,ra.ResourceAttributeName
	,rav.Value as ResourceAttributeValue
FROM TOPIC t
LEFT JOIN RESOURCE_TOPIC rtop on rtop.TopicID = t.TopicID
LEFT JOIN [RESOURCE] r on r.ResourceID = rtop.ResourceID
LEFT JOIN [RESOURCE_TYPE] rtype on rtype.ResourceTypeID = r.ResourceTypeID
LEFT JOIN RESOURCE_TYPE_ATTRIBUTE rta on rta.ResourceTypeID = rtype.ResourceTypeID
	LEFT JOIN RESOURCE_ATTRIBUTE ra on ra.ResourceAttributeID = rta.ResourceAttributeID
LEFT JOIN RESOURCE_ATTRIBUTE_VALUE rav on rav.ResourceTypeAttributeID = rta.ResourceTypeAttributeID
		and rav.ResourceID = r.ResourceID
ORDER BY 2,3,4,5